'use strict';

const config = require("./config");

import { Client } from 'ghastly';

const client = new Client({ prefix: '!' });

function ping() {
  async function handler() {
    return 'pong!';
  }
  
  return {
    handler,
    triggers: ['ping'],
  };
}

client.dispatcher.load(ping);

client.on('ready', () => {
  console.log("Bot running...");
});

client.login(config.token);