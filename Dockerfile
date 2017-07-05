FROM node:6

ENV BASE_URL '/'

RUN mkdir -p /usr/src/app/dist/docs \
&& mkdir /usr/src/app/tests \
&& ln -s /usr/src/app/tests/ /usr/src/app/dist/docs/tests
VOLUME "/usr/src/app/tests"

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install --production

COPY . /usr/src/app

ENV BABEL_DISABLE_CACHE=0

EXPOSE 1337

RUN npm run build

CMD [ "npm", "start" ]
