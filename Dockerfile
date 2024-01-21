FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

WORKDIR /app

COPY ./requirements.txt /code/requirements.txt

COPY ./app /app

RUN pip3 install -r requirements.txt 

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

