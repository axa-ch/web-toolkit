FROM node:onbuild
EXPOSE 3000

ENV GITHUB_USERNAME ''
ENV GITHUB_PASSWORD ''

CMD ./node_modules/.bin/gulp build && ./node_modules/.bin/gulp serve
