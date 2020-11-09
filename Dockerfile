FROM node:12

LABEL maintainer="Suttipong Montreewong"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD package.json /usr/src/app/
RUN npm install

ADD . /usr/src/app

CMD ["npm", "run", "start:prod"]

EXPOSE 3000