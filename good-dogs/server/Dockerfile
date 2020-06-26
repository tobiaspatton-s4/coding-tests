FROM python:3

COPY . /app
WORKDIR /app

RUN pip install pipenv
RUN pipenv install --system --deploy --ignore-pipfile 

CMD gunicorn -b 0.0.0.0:8000 main:app
