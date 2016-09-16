FROM node:5-slim
EXPOSE 3000

# Will unfortunately have to keep this as long as
# we have git deps in package.json
RUN apt-get update && apt-get install -y --no-install-recommends git \
	&& rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install --quiet
# Gulp can't find babel-register, nor babel-core/register, nor babel/register
# Hence are build fails, though we have babel-core and babel-register in our package.json
# To reinstall babel-register manually after npm install seems to workaround this issue
RUN npm install babel-register --quiet
COPY . /usr/src/app

RUN npm run build

CMD [ "npm", "start" ]
