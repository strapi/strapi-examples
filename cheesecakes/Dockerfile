FROM strapi/base:latest

COPY . /srv/app

WORKDIR /srv/app

RUN npm install --legacy-peer-deps

RUN npm run setup --plugins

CMD ["npm", "start"]
