FROM python:3.8.2

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

COPY ./app /code/app

RUN pip3 install -r requirements.txt 

CMD ["uvicorn", "app.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "80"]