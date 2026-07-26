import streamlit as st
from pathlib import Path
import streamlit.components.v1 as components
import base64

st.set_page_config(
    page_title="Agent Flux",
    layout="wide"
)

folder = Path(__file__).parent

html = (folder / "index.html").read_text(encoding="utf-8")

# Convert local images to base64
for image in (folder / "images").glob("*"):
    if image.suffix.lower() in [".png",".jpg",".jpeg",".webp"]:
        with open(image, "rb") as img:
            encoded = base64.b64encode(img.read()).decode()

        html = html.replace(
            f"images/{image.name}",
            f"data:image/{image.suffix[1:]};base64,{encoded}"
        )

components.html(html, height=2000, scrolling=True)