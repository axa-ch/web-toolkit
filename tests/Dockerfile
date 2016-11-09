FROM axacom/screenshots

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install --quiet

COPY . /usr/src/app
RUN chmod +x ./run-tests.sh
VOLUME "/usr/src/app/tests"

# Phantom on linux cannot load fonts from the web. They must be present locally. Yeah...
RUN mv /usr/src/app/fonts /usr/share/fonts/truetype/

CMD [ "npm", "start" ]
