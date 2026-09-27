#!/usr/bin/env python3
"""Dependency-free structural validation for the iNWEB static website."""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
from xml.etree import ElementTree
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
ERRORS = []
PUBLIC_PREFIX = "/iNWEB-Developer/"
PROFILE_ROUTES = {
    "yoursamibd": "@CEO",
    "inana": "@iNAYA",
    "aira": "@AIRA",
    "apex": "@APEX",
    "beacon": "@BEACON",
    "aegis": "@AEGIS",
    "vault": "@VAULT",
    "cipher": "@CIPHER",
    "nova": "@NOVA",
    "orbit": "@ORBIT",
    "horizon": "@HORIZON",
    "forge": "@FORGE",
    "canvas": "@CANVAS",
    "veritas": "@VERITAS",
    "pulse": "@PULSE",
    "relay": "@RELAY",
}


def error(message, file="", line=None):
    location = f" file={file}" if file else ""
    if line is not None:
        location += f",line={line}"
    print(f"::error{location}::{message}")
    ERRORS.append(message)


class DocumentParser(HTMLParser):
    def __init__(self, source_file):
        super().__init__(convert_charrefs=True)
        self.source_file = source_file
        self.ids = set()
        self.fragments = []
        self.asset_references = []
        self.local_links = []
        self.members = []
        self.profile_controls = []
        self.profile_page_ids = []
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
                error(f"Duplicate id: {identifier}", self.source_file, line)
            self.ids.add(identifier)

        href = attributes.get("href", "")
        if href.startswith("#") and len(href) > 1:
            self.fragments.append((unquote(href[1:]), line))
        elif tag == "a" and is_local_reference(href):
            self.local_links.append((href, line))

        if tag == "link" and attributes.get("href"):
            relation = set(attributes.get("rel", "").split())
            if relation.intersection({"stylesheet", "icon", "manifest"}):
                self.asset_references.append((attributes["href"], line))
        if tag in {"script", "img", "source"} and attributes.get("src"):
            self.asset_references.append((attributes["src"], line))
        if tag == "meta" and attributes.get("property") == "og:image" and attributes.get("content"):
            self.asset_references.append((attributes["content"], line))

        bilingual_pairs = (
            ("data-en", "data-bn", "Visible English copy requires Bengali copy"),
            ("data-placeholder-en", "data-placeholder-bn", "English placeholder requires Bengali copy"),
            ("data-aria-en", "data-aria-bn", "English accessible label requires Bengali copy"),
            ("data-title-en", "data-title-bn", "English page title requires Bengali copy"),
            ("data-description-en", "data-description-bn", "English page description requires Bengali copy"),
        )
        for english_attribute, bengali_attribute, message in bilingual_pairs:
            if english_attribute in attributes and bengali_attribute not in attributes:
                error(message, self.source_file, line)
            if bengali_attribute in attributes and english_attribute not in attributes:
                error(message.replace("English", "Bengali"), self.source_file, line)

        if tag == "button" and attributes.get("type") != "button":
            error("Every button must explicitly use type=button", self.source_file, line)
        if tag == "img" and "alt" not in attributes:
            error("Every image requires an alt attribute", self.source_file, line)

        if "data-member" in attributes:
            self.members.append((attributes["data-member"], line))
        if "data-profile" in attributes:
            self.profile_controls.append((attributes["data-profile"], href, line))
        if "data-profile-page" in attributes:
            self.profile_page_ids.append((attributes.get("data-profile-id", ""), line))


def is_local_reference(reference):
    if not reference:
        return False
    parsed = urlsplit(reference)
    return not parsed.scheme and not parsed.netloc and not reference.startswith(("#", "mailto:", "tel:", "data:"))


def public_reference_path(reference):
    parsed = urlsplit(reference)
    if (
        parsed.scheme == "https"
        and parsed.netloc.lower() == "inweb-official.github.io"
        and parsed.path.startswith(PUBLIC_PREFIX)
    ):
        return unquote(parsed.path.removeprefix(PUBLIC_PREFIX))
    return None


def resolve_local_path(document_path, reference):
    parsed = urlsplit(reference)
    public_path = public_reference_path(reference)
    if public_path is not None:
        target = ROOT / public_path
    elif is_local_reference(reference):
        target = document_path.parent / unquote(parsed.path)
    else:
        return None
    target = target.resolve()
    try:
        target.relative_to(ROOT.resolve())
    except ValueError:
        return False
    if target.is_dir():
        target = target / "index.html"
    return target


def parse_document(path):
    relative_path = str(path.relative_to(ROOT))
    parser = DocumentParser(relative_path)
    try:
        parser.feed(path.read_text(encoding="utf-8"))
        parser.close()
    except Exception as exception:
        error(f"Unable to parse HTML: {exception}", relative_path)
        return None
    return parser


def validate_common_document(path, parser):
    relative_path = str(path.relative_to(ROOT))
    if parser.html_lang != "en":
        error("The no-JavaScript document language must default to en", relative_path)
    if not "".join(parser.title_text).strip():
        error("A non-empty title is required", relative_path)
    if parser.h1_count != 1:
        error(f"Expected exactly one h1, found {parser.h1_count}", relative_path)
    for required_meta in {"description", "viewport"}:
        if required_meta not in parser.meta_names:
            error(f"Missing required {required_meta} meta element", relative_path)

    for fragment, line in parser.fragments:
        if fragment not in parser.ids:
            error(f"Broken fragment reference: #{fragment}", relative_path, line)

    for input_id, line in parser.inputs:
        if input_id not in parser.labels:
            error(f"Input #{input_id} has no explicit label", relative_path, line)

    for reference, line in parser.asset_references:
        target = resolve_local_path(path, reference)
        if target is None:
            error(f"Runtime asset must be repository-owned: {reference}", relative_path, line)
        elif target is False:
            error(f"Asset path escapes repository: {reference}", relative_path, line)
        elif not target.is_file():
            error(f"Missing referenced asset: {reference}", relative_path, line)

    for reference, line in parser.local_links:
        target = resolve_local_path(path, reference)
        if target is False:
            error(f"Link path escapes repository: {reference}", relative_path, line)
        elif target is not None and not target.is_file():
            error(f"Broken local page link: {reference}", relative_path, line)


def validate_root_page():
    path = ROOT / "index.html"
    parser = parse_document(path)
    if parser is None:
        return None
    validate_common_document(path, parser)

    member_ids = [member for member, _ in parser.members]
    controls = {profile_id: (href, line) for profile_id, href, line in parser.profile_controls}
    if len(member_ids) != len(PROFILE_ROUTES):
        error(f"Expected {len(PROFILE_ROUTES)} staff cards, found {len(member_ids)}", "index.html")
    if len(member_ids) != len(set(member_ids)):
        error("Staff card identifiers must be unique", "index.html")
    if set(member_ids) != set(PROFILE_ROUTES):
        error("Staff cards do not match the approved profile registry", "index.html")
    if set(controls) != set(PROFILE_ROUTES):
        error("Every staff card must link to one individual profile", "index.html")

    for profile_id, handle in PROFILE_ROUTES.items():
        if profile_id not in controls:
            continue
        href, line = controls[profile_id]
        if href != f"{handle}/":
            error(f"Profile {profile_id} must link to {handle}/", "index.html", line)

    return set(member_ids)


def validate_profile_pages():
    expected_directories = set(PROFILE_ROUTES.values())
    actual_directories = {path.parent.name for path in ROOT.glob("@*/index.html")}
    if actual_directories != expected_directories:
        missing = sorted(expected_directories - actual_directories)
        extra = sorted(actual_directories - expected_directories)
        error(f"Individual profile page mismatch; missing={missing}, extra={extra}")

    for profile_id, handle in PROFILE_ROUTES.items():
        path = ROOT / handle / "index.html"
        if not path.is_file():
            continue
        parser = parse_document(path)
        if parser is None:
            continue
        validate_common_document(path, parser)
        declared_profile_ids = [declared_id for declared_id, _ in parser.profile_page_ids]
        if declared_profile_ids != [profile_id]:
            error(f"Profile page must declare data-profile-id={profile_id}", str(path.relative_to(ROOT)))
        html = path.read_text(encoding="utf-8")
        canonical = f"https://inweb-official.github.io/iNWEB-Developer/{handle}/"
        if f'<link rel="canonical" href="{canonical}">' not in html:
            error("Profile canonical URL is missing or incorrect", str(path.relative_to(ROOT)))


def validate_text_files():
    allowed_suffixes = {".html", ".css", ".js", ".svg", ".xml", ".md", ".txt", ".py", ".yml", ".yaml"}
    for path in ROOT.rglob("*"):
        if not path.is_file() or ".git" in path.parts:
            continue
        relative_path = str(path.relative_to(ROOT))
        if path.name in {"LICENSE", "VERSION", ".nojekyll"} or path.suffix.lower() in allowed_suffixes:
            try:
                content = path.read_text(encoding="utf-8")
            except UnicodeDecodeError:
                error("File must be UTF-8", relative_path)
                continue
            for number, line in enumerate(content.splitlines(), 1):
                if line.endswith((" ", "\t")):
                    error("Trailing whitespace", relative_path, number)
        elif path.suffix.lower() not in {".png", ".jpg", ".jpeg", ".webp", ".ico"}:
            error("Unexpected file type in static repository", relative_path)


def validate_stylesheets():
    for path in (ROOT / "assets/css").glob("*.css"):
        relative_path = str(path.relative_to(ROOT))
        css = path.read_text(encoding="utf-8")
        if re.search(r"@import\s|url\(\s*['\"]?https?://", css, re.IGNORECASE):
            error("CSS must not load remote runtime dependencies", relative_path)
        if css.count("{") != css.count("}"):
            error("CSS braces are unbalanced", relative_path)


def validate_javascript():
    for path in (ROOT / "assets/js").glob("*.js"):
        relative_path = str(path.relative_to(ROOT))
        javascript = path.read_text(encoding="utf-8")
        if any(token in javascript for token in (".innerHTML", "insertAdjacentHTML", "eval(")):
            error("Avoid HTML-string insertion and dynamic code evaluation", relative_path)


def validate_sitemap():
    sitemap_path = ROOT / "sitemap.xml"
    try:
        tree = ElementTree.parse(sitemap_path)
    except (ElementTree.ParseError, OSError) as exception:
        error(f"Unable to parse sitemap: {exception}", "sitemap.xml")
        return
    namespace = {"sitemap": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    actual_urls = {
        element.text.strip()
        for element in tree.findall("sitemap:url/sitemap:loc", namespace)
        if element.text
    }
    public_root = "https://inweb-official.github.io/iNWEB-Developer/"
    expected_urls = {public_root, *(f"{public_root}{handle}/" for handle in PROFILE_ROUTES.values())}
    if actual_urls != expected_urls:
        missing = sorted(expected_urls - actual_urls)
        extra = sorted(actual_urls - expected_urls)
        error(f"Sitemap URL mismatch; missing={missing}, extra={extra}", "sitemap.xml")
    robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
    if f"Sitemap: {public_root}sitemap.xml" not in robots:
        error("robots.txt must advertise the public sitemap", "robots.txt")


def validate_release_metadata():
    version = (ROOT / "VERSION").read_text(encoding="utf-8").strip()
    semver = r"(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?"
    if not re.fullmatch(semver, version):
        error(f"VERSION is not valid Semantic Versioning: {version}", "VERSION")
    for path in [ROOT / "index.html", *ROOT.glob("@*/index.html")]:
        if f"v{version}" not in path.read_text(encoding="utf-8"):
            error("Displayed website version does not match VERSION", str(path.relative_to(ROOT)))
    changelog = (ROOT / "CHANGELOG.md").read_text(encoding="utf-8")
    if f"[{version}]" not in changelog:
        error("CHANGELOG does not contain the current version", "CHANGELOG.md")


required_files = [
    ".nojekyll",
    "index.html",
    "assets/css/styles.css",
    "assets/css/profile.css",
    "assets/js/app.js",
    "assets/js/profile-page.js",
    "assets/images/favicon.svg",
    "assets/images/social-card.svg",
    "README.md",
    "LICENSE",
    "VERSION",
    "CHANGELOG.md",
    "robots.txt",
    "sitemap.xml",
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
    validate_root_page()
    validate_profile_pages()
    validate_stylesheets()
    validate_javascript()
    validate_sitemap()
    validate_release_metadata()

if ERRORS:
    print(f"Validation failed with {len(ERRORS)} error(s).")
    sys.exit(1)

print(f"Static website validation passed with {len(PROFILE_ROUTES)} individual profile pages.")
