from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import os

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/GEO", StaticFiles(directory="GEO"), name="GEO")
templates = Jinja2Templates(directory="templates")

def makehtml():
    with open("templates/index.html", "r", encoding="utf-8") as file:
        return file.read()

def is_json_file(filename):
    return filename.endswith('.json')

@app.get("/")
def viewpage():
    html_content = makehtml()
    return HTMLResponse(content=html_content, status_code=200)

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    if not is_json_file(file.filename):
        raise HTTPException(status_code=400, detail="Uploaded file must be a JSON file")
    upload_dir = "uploads"
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, file.filename)
    
    if os.path.exists(file_path):
        raise HTTPException(status_code=400, detail="File with the same name already exists")
    
    with open(file_path, "wb") as f:
        f.write(file.file.read())
        
    return {"message": "File uploaded successfully", "filename": file.filename}
