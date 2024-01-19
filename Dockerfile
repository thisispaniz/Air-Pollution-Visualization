# 
FROM python:3.8.2

# 
WORKDIR /AIR-POLLUTION-VISULIZATION/app

# 
COPY ./requirements.txt /AIR-POLLUTION-VISULIZATION/requirements.txt

# 
RUN pip install --no-cache-dir --upgrade -r /AIR-POLLUTION-VISULIZATION/requirements.txt

# 
COPY ./app /AIR-POLLUTION-VISULIZATION/app

# 
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80", "--reload"]