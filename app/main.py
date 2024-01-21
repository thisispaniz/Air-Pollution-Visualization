from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()
app.mount("/static", StaticFiles(directory="app/static"), name="static")
app.mount("/GEO", StaticFiles(directory="app/GEO"), name="GEO")
templates = Jinja2Templates(directory="app/templates")

def makehtml():
    with open("app/templates/index.html", "r", encoding="utf-8") as file:
        return file.read()


@app.get("/")
def viewpage():
    html_content = makehtml()
    return HTMLResponse(content=html_content, status_code=200)