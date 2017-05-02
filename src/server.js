// @flow

/**
 * @overview
 * The microservice's main service.
 *
 * It's a WebSocket server. It handles the realtime communication
 * and storage of messages in the database.
 *
 * In production, we start the server directly here, for the env variables are
 * set in the web service, e.g. Heroku.
 *
 * In development, we export the start function @see {@link start} and call it
 * there @see {@link index.js} after loading all environmental variables.
 *
 * @author Diego Stratta <strattadb@gmail>
 * @license GPL-3.0
 */
'use strict';

import WebSocket from 'ws';

import logger from './config/winston';
import { default as db, mongoConnectionString } from './config/db';

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * In development we want to load env variables before we start the server.
 */
if (NODE_ENV === 'production') {
  start();
}

/**
 * @name start
 * @function
 *
 * @description
 * Just a wrapper for initializing and starting the server.
 */
export default function start () {
  // Connect to the MongoDB database.
  db.open(mongoConnectionString);

  // Create the WebSocket server instance and start listening.
  const wss = new WebSocket.Server({
    port: PORT,
  }, () => {
    logger.info(`Chat microservice's main server (WebSocket) running in ${NODE_ENV} mode on port ${PORT}`);
  });

  wss.on('connection', async (ws) => {
    logger.info('websocket connection established.');
  });
}
