FROM python:3.8.2

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

COPY ./app /code/app

RUN pip3 install -r requirements.txt 

RUN python3 -m uvicorn app.main:app --relaod

