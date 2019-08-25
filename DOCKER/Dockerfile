FROM ubuntu:16.04
MAINTAINER Ben Lu
USER root

RUN apt-get update;\
apt-get install -y git sudo 
RUN sudo git clone https://github.com/luben3485/AIOThackthon-Web.git /AIOThackthon-web
RUN sudo apt-get update;\
     sudo apt-get -y upgrade;\
     sudo apt-get install -y python3 python3-pip

RUN sudo pip3 install flask requests pymongo requests-html flask-cors
EXPOSE 8080
WORKDIR /AIOThackthon-web/web
CMD python3 index.py
