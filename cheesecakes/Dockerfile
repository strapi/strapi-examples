FROM node:14

USER app

RUN mkdir -p ~/.local/bin

RUN npm config set prefix ~/.local/

RUN export PATH=$PATH:~/.local/bin

WORKDIR /home/app

COPY . ./srv/app

WORKDIR ./srv/app

# RUN cd admin && npm link strapi-helper-plugin && cd ../

RUN npm install --legacy-peer-deps

RUN npm run setup --plugins

CMD ["npm", "start"]
