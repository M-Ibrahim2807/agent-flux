from pathlib import Path
import base64
import mimetypes

import streamlit as st
import streamlit.components.v1 as components


st.set_page_config(page_title="Agent Flux", layout="wide")

ROOT = Path(__file__).parent
PAGES = {
    "Home": "index.html",
    "Why Choose Us": "about.html",
    "Employers": "employers.html",
    "Candidates": "candidates.html",
    "Jobs": "jobs.html",
    "Partners": "partners.html",
    "Contact": "contact.html",
}


def data_uri(path: Path) -> str:
    mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    return f"data:{mime};base64,{base64.b64encode(path.read_bytes()).decode()}"


def inline_static(html: str) -> str:
    css = (ROOT / "css" / "style.css").read_text(encoding="utf-8")
    js = (ROOT / "js" / "script.js").read_text(encoding="utf-8")
    html = html.replace('<link rel="stylesheet" href="css/style.css">', f"<style>{css}</style>")
    html = html.replace('<script src="js/script.js" defer></script>', f"<script>{js}</script>")

    for asset in (ROOT / "images").rglob("*"):
        if asset.is_file():
            html = html.replace(f"images/{asset.relative_to(ROOT / 'images').as_posix()}", data_uri(asset))

    return html


choice = st.sidebar.radio("Preview page", list(PAGES))
source = (ROOT / PAGES[choice]).read_text(encoding="utf-8")
components.html(inline_static(source), height=2400, scrolling=True)
