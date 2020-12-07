# build environment
FROM node:12.20.0-buster as build
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./
RUN npm run build

# production environment
FROM node:12.20.0-buster-slim
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV production

COPY package.json ./
COPY package-lock.json ./

RUN npm install --production
COPY --from=build /app/build ./build

ENV API_SECRET='' \
    API_HOST='' \
    API_USERNAME='' \
    API_PASSWORD=''

EXPOSE 80
CMD ["node", "/app/build/src/server.js"]
