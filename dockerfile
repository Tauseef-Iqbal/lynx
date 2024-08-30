FROM node:18-alpine

WORKDIR /usr/home/lynx-api

RUN apk add --no-cache curl && \
    curl -o- -L https://yarnpkg.com/install.sh | sh

COPY package.json ./

RUN yarn

COPY . .

RUN yarn build

EXPOSE 9090:9090

CMD ["node" , "dist/main.js"]

