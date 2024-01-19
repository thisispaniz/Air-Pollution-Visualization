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
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80", "--reload"]