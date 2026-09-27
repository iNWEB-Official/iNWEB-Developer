#!/usr/bin/env python3
"""Dependency-free structural validation for the iNWEB static website."""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
ERRORS = []


def error(message, file="", line=None):
    location = f" file={file}" if file else ""
    if line is not None:
        location += f",line={line}"
    print(f"::error{location}::{message}")
    ERRORS.append(message)


class SiteParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.ids = set()
        self.fragments = []
        self.references = []
        self.members = []
        self.profile_buttons = []
        self.labels = set()
        self.inputs = []
        self.h1_count = 0
        self.title_text = []
        self.in_title = False
        self.html_lang = ""
        self.meta_names = set()

    def handle_starttag(self, tag, attrs):
        self._handle_element(tag, attrs)

    def handle_startendtag(self, tag, attrs):
        self._handle_element(tag, attrs)

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.title_text.append(data)

    def _handle_element(self, tag, attrs):
        line, _ = self.getpos()
        attributes = dict(attrs)

        if tag == "html":
            self.html_lang = attributes.get("lang", "")
        if tag == "title":
            self.in_title = True
        if tag == "h1":
            self.h1_count += 1
        if tag == "meta":
            name = attributes.get("name")
            if name:
                self.meta_names.add(name)
        if tag == "label" and attributes.get("for"):
            self.labels.add(attributes["for"])
        if tag == "input" and attributes.get("id"):
            self.inputs.append((attributes["id"], line))

        identifier = attributes.get("id")
        if identifier:
            if identifier in self.ids:
                error(f"Duplicate id: {identifier}", "index.html", line)
            self.ids.add(identifier)

        href = attributes.get("href", "")
        if href.startswith("#") and len(href) > 1:
            self.fragments.append((href[1:], line))

        if tag == "link" and attributes.get("href"):
            relation = set(attributes.get("rel", "").split())
            if relation.intersection({"stylesheet", "icon", "manifest"}):
                self.references.append((attributes["href"], line))
        if tag in {"script", "img", "source"} and attributes.get("src"):
            self.references.append((attributes["src"], line))
        if tag == "meta" and attributes.get("property") == "og:image" and attributes.get("content"):
            self.references.append((attributes["content"], line))

        if "data-en" in attributes and "data-bn" not in attributes:
            error("data-en requires a matching data-bn attribute", "index.html", line)
        if "data-bn" in attributes and "data-en" not in attributes:
            error("data-bn requires a matching data-en attribute", "index.html", line)
        if "data-placeholder-en" in attributes and "data-placeholder-bn" not in attributes:
            error("English placeholder requires a Bengali placeholder", "index.html", line)
        if "data-aria-en" in attributes and "data-aria-bn" not in attributes:
            error("English accessible label requires a Bengali label", "index.html", line)

        if tag == "button" and attributes.get("type") != "button":
            error("Every button must explicitly use type=button", "index.html", line)
        if tag == "img" and "alt" not in attributes:
            error("Every image requires an alt attribute", "index.html", line)

        if "data-member" in attributes:
            self.members.append((attributes["data-member"], line))
        if "data-profile" in attributes:
            self.profile_buttons.append((attributes["data-profile"], line))


def is_local_reference(reference):
    parsed = urlsplit(reference)
    return not parsed.scheme and not parsed.netloc and not reference.startswith(("#", "mailto:", "tel:", "data:"))


def validate_text_files():
    allowed_suffixes = {".html", ".css", ".js", ".svg", ".md", ".txt", ".py", ".yml", ".yaml"}
    ignored_parts = {".git"}
    for path in ROOT.rglob("*"):
        if not path.is_file() or any(part in ignored_parts for part in path.parts):
            continue
        if path.name in {"LICENSE", "VERSION", ".nojekyll"} or path.suffix.lower() in allowed_suffixes:
            try:
                content = path.read_text(encoding="utf-8")
            except UnicodeDecodeError:
                error("File must be UTF-8", str(path.relative_to(ROOT)))
                continue
            for number, line in enumerate(content.splitlines(), 1):
                if line.endswith((" ", "\t")):
                    error("Trailing whitespace", str(path.relative_to(ROOT)), number)
        elif path.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp", ".ico"}:
            continue
        else:
            error("Unexpected file type in static repository", str(path.relative_to(ROOT)))


def validate_html():
    html_path = ROOT / "index.html"
    parser = SiteParser()
    try:
        parser.feed(html_path.read_text(encoding="utf-8"))
        parser.close()
    except Exception as exception:
        error(f"Unable to parse HTML: {exception}", "index.html")
        return None

    if parser.html_lang != "en":
        error("The no-JavaScript document language must default to en", "index.html")
    if not "".join(parser.title_text).strip():
        error("A non-empty title is required", "index.html")
    if parser.h1_count != 1:
        error(f"Expected exactly one h1, found {parser.h1_count}", "index.html")
    for required_meta in {"description", "viewport"}:
        if required_meta not in parser.meta_names:
            error(f"Missing required {required_meta} meta element", "index.html")

    for fragment, line in parser.fragments:
        if unquote(fragment) not in parser.ids:
            error(f"Broken fragment reference: #{fragment}", "index.html", line)

    for input_id, line in parser.inputs:
        if input_id not in parser.labels:
            error(f"Input #{input_id} has no explicit label", "index.html", line)

    for reference, line in parser.references:
        parsed_reference = urlsplit(reference)
        if is_local_reference(reference):
            relative_path = unquote(parsed_reference.path).lstrip("/")
        elif (
            parsed_reference.scheme == "https"
            and parsed_reference.netloc.lower() == "inweb-official.github.io"
            and parsed_reference.path.startswith("/iNWEB-Developer/")
        ):
            relative_path = unquote(parsed_reference.path.removeprefix("/iNWEB-Developer/"))
        else:
            error(f"Runtime asset must be local: {reference}", "index.html", line)
            continue
        target = (ROOT / relative_path).resolve()
        try:
            target.relative_to(ROOT.resolve())
        except ValueError:
            error(f"Asset path escapes repository: {reference}", "index.html", line)
            continue
        if not target.is_file():
            error(f"Missing referenced asset: {reference}", "index.html", line)

    member_ids = [member for member, _ in parser.members]
    profile_ids = [profile for profile, _ in parser.profile_buttons]
    if len(member_ids) != 16:
        error(f"Expected 16 staff cards, found {len(member_ids)}", "index.html")
    if len(member_ids) != len(set(member_ids)):
        error("Staff card identifiers must be unique", "index.html")
    if sorted(member_ids) != sorted(profile_ids):
        error("Every staff card must have one matching profile button", "index.html")

    return set(member_ids)


def validate_css():
    css = (ROOT / "assets/css/styles.css").read_text(encoding="utf-8")
    if re.search(r"@import\s|url\(\s*['\"]?https?://", css, re.IGNORECASE):
        error("CSS must not load remote runtime dependencies", "assets/css/styles.css")
    if css.count("{") != css.count("}"):
        error("CSS braces are unbalanced", "assets/css/styles.css")


def validate_javascript(member_ids):
    script_path = ROOT / "assets/js/app.js"
    javascript = script_path.read_text(encoding="utf-8")
    if any(token in javascript for token in (".innerHTML", "insertAdjacentHTML", "eval(")):
        error("Avoid HTML-string insertion and dynamic code evaluation", "assets/js/app.js")

    marker = "\n  const documentElement"
    try:
        profile_source = javascript.split("const profiles = {", 1)[1].split(marker, 1)[0]
    except IndexError:
        error("Unable to locate the profile registry", "assets/js/app.js")
        return
    profile_ids = set(re.findall(r"^    ([a-z][a-z0-9]*): \{$", profile_source, re.MULTILINE))
    if member_ids is not None and profile_ids != member_ids:
        missing = sorted(member_ids - profile_ids)
        extra = sorted(profile_ids - member_ids)
        error(f"Profile registry mismatch; missing={missing}, extra={extra}", "assets/js/app.js")


def validate_release_metadata():
    version = (ROOT / "VERSION").read_text(encoding="utf-8").strip()
    if not re.fullmatch(r"(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?", version):
        error(f"VERSION is not valid Semantic Versioning: {version}", "VERSION")
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    if f"v{version}" not in html:
        error("Displayed website version does not match VERSION", "index.html")
    changelog = (ROOT / "CHANGELOG.md").read_text(encoding="utf-8")
    if f"[{version}]" not in changelog:
        error("CHANGELOG does not contain the current version", "CHANGELOG.md")


required_files = [
    "index.html",
    "assets/css/styles.css",
    "assets/js/app.js",
    "assets/images/favicon.svg",
    "assets/images/social-card.svg",
    "README.md",
    "LICENSE",
    "VERSION",
    "CHANGELOG.md",
    "robots.txt",
]
for required_file in required_files:
    target = ROOT / required_file
    if not target.is_file():
        error("Required file is missing", required_file)
    elif target.name != ".nojekyll" and target.stat().st_size == 0:
        error("Required file is empty", required_file)

for forbidden_file in ("package.json", "package-lock.json", "pnpm-lock.yaml", "yarn.lock"):
    if (ROOT / forbidden_file).exists():
        error("Static website must not include Node.js project metadata", forbidden_file)

if not ERRORS:
    validate_text_files()
    member_identifiers = validate_html()
    validate_css()
    validate_javascript(member_identifiers)
    validate_release_metadata()

if ERRORS:
    print(f"Validation failed with {len(ERRORS)} error(s).")
    sys.exit(1)

print("Static website validation passed.")
