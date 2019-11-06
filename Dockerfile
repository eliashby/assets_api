FROM node:8

LABEL maintainer="eashby@response.com"

RUN apt-get update && apt-get upgrade 

RUN apt install -y nodejs npm

WORKDIR /var/www/app

COPY . /var/www/app

RUN cd $(npm root -g)/npm \
 && npm install fs-extra \
 && sed -i -e s/graceful-fs/fs-extra/ -e s/fs\.rename/fs.move/ ./lib/utils/rename.js

EXPOSE 8080

ENTRYPOINT [ "node", "./bin/www" ]