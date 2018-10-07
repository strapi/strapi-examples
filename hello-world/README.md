# Hello World - Example

## Setup

**1 —** Clone the repository.
```bash
git clone git@github.com:strapi/strapi-examples.git
```

**2 —** Go to the `hello-world` example and install the dependencies.
```bash
cd hello-world
npm install
```

**3 —** Start the server.
```bash
npm start
```

## Available URLs

When your application is started you can visit these URLs:

- `/hello`
- `/hello/:name` - Replece `:name` with your name (eg. `/hello/strapi`)
- `/hello/world/:name` - It use `/config/locales/**.json` files to translate `welcome` keys in your browser language.
