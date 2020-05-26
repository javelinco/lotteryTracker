FROM node:alpine as base
ENV NODE_ENV=production
WORKDIR /opt
COPY package*.json ./
RUN npm config list \
  && npm ci \
  && npm cache clean --force

FROM base as basedev
ENV NODE_ENV=development
ENV PATH=/opt/node_modules/.bin:$PATH
WORKDIR /opt
RUN npm install --only=development
WORKDIR /opt/app

FROM basedev as dev
CMD ["nodemon", "--inspect=0.0.0.0:9229", "src/index.ts"]

FROM basedev as test
COPY . .
RUN npm run lint
RUN npm run test

FROM basedev as compile
COPY . .
RUN npm run compile

FROM base as prod
WORKDIR /opt/app
COPY --from=compile /opt/app/dist/out-tsc/src /opt/app
CMD ["node", "index.js"]