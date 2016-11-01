FROM node:5-slim
EXPOSE 3000

ENV BASE_URL '/'

# Will unfortunately have to keep this as long as
# we have git deps in package.json
RUN apt-get update && apt-get install -y --no-install-recommends git \
	&& rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr/src/app/dist/docs
RUN mkdir /usr/src/app/tests
RUN ln -s /usr/src/app/tests/ /usr/src/app/dist/docs/tests
VOLUME "/usr/src/app/tests"

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install --quiet

COPY . /usr/src/app

RUN npm run build

CMD [ "npm", "start" ]