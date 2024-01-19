# 
FROM python:3.8.2

# 
WORKDIR /AIR-POLLUTION-VISULIZATION

# 
COPY ./requirements.txt /AIR-POLLUTION-VISULIZATION/requirements.txt

# 
RUN pip install --no-cache-dir -r requirements.txt

# 
COPY ./app /AIR-POLLUTION-VISULIZATION/app

# 
CMD ["pip", "install", "fastapi", "uvicorn"]