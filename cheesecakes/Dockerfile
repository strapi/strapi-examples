FROM node:16

COPY . /app

WORKDIR /app

RUN npm install --force

RUN npm run setup --plugins

CMD ["npm", "start"]
