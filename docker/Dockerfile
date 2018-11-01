FROM python:3
LABEL maintainer="saintentex@gmail.com"

ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
#WORKDIR /app/cci_legacy
ADD requirements.txt /code/
RUN pip install --upgrade pip
RUN pip3 install -r requirements.txt
COPY jet/utils.py /usr/local/lib/python3.7/site-packages/jet
CMD ['python3' ,'/code/manage.py', 'collectstatic']
EXPOSE 8000

#ADD . /code/
