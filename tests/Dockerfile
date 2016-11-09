FROM axacom/screenshots

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


COPY package.json /usr/src/app/
RUN npm install --quiet

COPY . /usr/src/app
RUN mkdir tests
VOLUME "/usr/src/app/tests"
RUN chmod +x ./run-tests.sh

# Phantom on linux cannot load fonts from the web. They must be present locally. Yeah...
RUN mv fonts/ /usr/share/fonts/truetype/


CMD [ "./run-tests.sh" ]
