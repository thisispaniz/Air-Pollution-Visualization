# 
FROM python:3.8.2

# 
WORKDIR /AIR-POLLUTION-VISULIZATION

# 
COPY ./requirements.txt /AIR-POLLUTION-VISULIZATION/requirements.txt

# 
RUN pip install fastapi uvicorn

# 
COPY ./app /AIR-POLLUTION-VISULIZATION/app

# 
CMD ["pip", "install", "fastapi", "uvicorn"]