FROM axacom/screenshots

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install --quiet

COPY . /usr/src/app

CMD [ "./run-tests.sh" ]