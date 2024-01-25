from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import os

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/GEO", StaticFiles(directory="GEO"), name="GEO")
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
templates = Jinja2Templates(directory="templates")

def makehtml():
    with open("templates/index.html", "r", encoding="utf-8") as file:
        return file.read()

def is_json_file(filename):
    return filename.endswith('.json')

def viewpage():
    # Your existing code here
    html_content = makehtml()
    response = HTMLResponse(content=html_content, status_code=200)
    response.set_cookie(key="tunnel_phishing_protection", value="your_value", samesite="None", secure=True)
    return response

@app.post("/uploadfile/")
async def create_upload_file(file: UploadFile = File(...)):
    if not is_json_file(file.filename):
        raise HTTPException(status_code=400, detail="Uploaded file must be a JSON file")
    new_filename = "citydata.json"
    upload_dir = "uploads"
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, new_filename)
    
    with open(file_path, "wb") as f:
        f.write(file.file.read())
        
    return {"message": "File uploaded successfully", "filename": file.filename}
