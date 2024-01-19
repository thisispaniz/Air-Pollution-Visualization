# 
FROM python:3.8.2

# 
WORKDIR /app

# 
COPY ./requirements.txt /AIR-POLLUTION-VISULIZATION/requirements.txt

# 
RUN pip install -r requirements.txt


# 
CMD ["uvicorn", "main:app", "--reload"]