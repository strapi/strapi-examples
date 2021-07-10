FROM node:14

RUN adduser appuser

USER appuser

RUN mkdir -p ~/.local/bin

RUN npm config set prefix ~/.local/

RUN export PATH=$PATH:~/.local/bin

WORKDIR /home/appuser

COPY --chown=appuser:appuser . ./srv/app

WORKDIR ./srv/app

RUN npm install --legacy-peer-deps

RUN npm run setup --plugins

CMD ["npm", "start"]
