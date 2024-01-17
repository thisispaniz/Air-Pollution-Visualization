from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from os import listdir, rename
from os.path import isfile, join
import numpy as np
from fastapi.templating import Jinja2Templates

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/GEO", StaticFiles(directory="static"), name="GEO")
templates = Jinja2Templates(directory="templates")

def makehtml():
    with open("templates/index.html", "r", encoding="utf-8") as file:
        return file.read()


@app.get("/")
def viewpage():
    html_content = makehtml()
    return HTMLResponse(content=html_content, status_code=200)