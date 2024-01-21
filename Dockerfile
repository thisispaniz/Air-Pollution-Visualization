FROM python:3.8.2

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt
COPY ./app /app

RUN pip3 install -r requirements.txt 

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
