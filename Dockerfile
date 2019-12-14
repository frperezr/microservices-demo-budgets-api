FROM node:alpine

WORKDIR /budgets-api

COPY ./package.json ./

RUN yarn install --production=true
# RUN yarn install

COPY dist /budgets-api/dist
COPY bin/goose /usr/bin/goose
COPY bin/wait-db /usr/bin/wait-db
COPY src/database/migrations /migrations
COPY pb /budgets-api/pb

EXPOSE 3040

CMD ["/bin/sh", "-l", "-c", "wait-db && goose -dir /migrations postgres ${POSTGRES_DSN} up && yarn start"]