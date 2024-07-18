FROM node:20.12.2-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build-prod

FROM node:20.12.2-alpine
WORKDIR /app

COPY --from=build /app/dist ./
EXPOSE 4000

CMD ["node", "/app/bbn-frontend/server/server.mjs"]
