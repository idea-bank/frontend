This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## About

This is the frontend web application for the ideabank project. It provides a responsive webview for the data it retrieves from the [ideabank-webapi](https://github.com/idea-bank/ideabank-webapi). It can also provide new data to that same API. The application is written in typescript using the [nextjs](https://nextjs.org) framework.

## Getting started

### Local setup

First, install the dependencies

```shell
$ npm install .
```

Second, start the development server

```shell
$ npm run dev
# or
$ yarn dev
# or
$ pnpm dev
```

Then, visit the local URL. Should be `http://localhost:3000` if using default settings

### Containerized

A `Dockerfile` is provided to set up a local server in a docker container. This can be used for deployment elsewhere, but is not recommended to attain real-time development

Build the image like so.

```shell
$ docker build . -t webapp
```

Launch a container with

```shell
docker run -p 3000:3000 --name webapp --rm webapp
```

**You can retain the container after shutdown by withholding the `--rm` although this isn't likely useful during actual development**

## Contributors

- Matthew Isayan
- Jeewanjyot Dhanjal
- Nathan Mendoza (nathancm@uci.edu)
