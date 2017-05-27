# rndevoo's Chat Microservice

[![Build Status](https://travis-ci.org/rndevoo/chat.svg?branch=master)](https://travis-ci.org/rndevoo/chat)
[![CircleCI](https://circleci.com/gh/rndevoo/chat.svg?style=shield)](https://circleci.com/gh/rndevoo/chat)
[![Coverage Status](https://coveralls.io/repos/github/rndevoo/chat/badge.svg?branch=master)](https://coveralls.io/github/rndevoo/chat?branch=master)
[![David](https://david-dm.org/rndevoo/chat.svg)](https://david-dm.org/rndevoo/chat)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## Introduction

This is rndevoo's chat microservice. It handles the real-time chat within the
app.

It is written in JavaScript using [Flow](https://flow.org). Fully containerized
using [Docker](https://docker.com).

It uses [RabbitMQ](https://www.rabbitmq.com) for inter-service communication
and [ws](https://github.com/websockets/ws) for the WebSockets server.

The tests are written with [Mocha](https://mochajs.org), [Chai](chaijs.com)
(expect variant) and [Sinon](sinonjs.org).

## Installation

### Common Configuration to All Services

You'll need Docker and Docker Compose installed in your machine.
If you don't have them, follow their guides:
[for Docker](https://docs.docker.com/engine/installation) and
[for Docker Compose](https://docs.docker.com/compose/gettingstarted).

Now, if it hasn't already been created, we need to create a custom
Docker network so we run all of our services containers and the RabbitMQ
server in the same network and can communicate with each other.

So, check if the network has been created:

```bash
$ docker network ls | grep rndevoo_network
```

If nothing shows up, then create it:

```bash
$ docker network create --driver bridge rndevoo_network
```

Now we need to have a RabbitMQ server running in a docker container in order
to let the inter-service communication happen:

First check if it hasn't been created already:

```bash
$ docker ps -a | grep rabbit
```

If you see nothing, it is time to spin up a RabbitMQ container:

```bash
$ docker run -d --hostname rabbitmq --network rndevoo_network --name rabbit \
-p 15672:15672 -p 5672:5672 rabbitmq:3-management
```

To learn more about Docker, [see their docs](https://docs.docker.com/engine/).

### Install System Requirements

You'll need [Node](https://nodejs.org). And we use [Yarn](https://yarnpkg.com)
instead of npm.

To install them, follow their guides:
[for Node](https://nodjes.org/en/download/package-manager) and
[for Yarn](https://yarnpkg.com/en/docs/install)

### Configure Environmental Variables

Generate your local .env file:

```shell
$ yarn run gen_env_file
```

Now that you have your local .env file, fill it!

### Install App Dependencies

```bash
$ yarn install
```

## Spinning Up the Development Container

Run the container in the background:

```bash
$ docker-compose up -d
```

To learn more about Docker Compose
[see their docs](https://docs.docker.com/compose/gettingstarted).

## Testing

Run the tests:

```bash
$ yarn test
```

## Other Services and API Gateway

- [API Gateway](https://github.com/rndevoo/gateway)
- [Logging](https://github.com/rndevoo/logging)

## License

[GPL-3.0](https://www.gnu.org/licenses/gpl-3.0.en.html)
