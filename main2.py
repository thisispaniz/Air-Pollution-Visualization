from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from os import listdir, rename
from os.path import isfile, join
import numpy as np


app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")


def makehtml(filter=None):
    header = """
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <script src="https://d3js.org/d3.v5.min.js"></script>
                <title>Air Pollution Visualization</title>
                <link rel="stylesheet" href="static/styles.css">

            </head>
            <body>
        """
    footer = """
            </body>
        </html>
        """
    content="""
            <script src="static/index-final.js"></script>
        
        """
    return header + content + footer


@app.get("/")
def viewpage():
    html_content = makehtml()
    return HTMLResponse(content=html_content, status_code=200)