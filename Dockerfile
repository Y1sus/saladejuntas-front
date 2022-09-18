FROM node

# MAINTAINER Jesús Montalvo <chuy_ronald@hotmail.com>

WORKDIR /home/app

COPY . .

RUN npm i esbuild-wasm

RUN npm install serve -g

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "serve"]

# CMD ["bash","./scripts/start.sh" ]