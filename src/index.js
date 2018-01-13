import { commands } from './commands';
import { PugBot } from './bot/PugBot';

let pugBot = new PugBot();

pugBot.loadCommands(commands);
pugBot.loadServices();
pugBot.applyPugsMiddleware();
pugBot.start();

import http from 'http';
import express from 'express';
const app = express();

const port = process.env.PORT || 5000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
  // ejs render automatically looks in the views folder
  response.render('index');
});

app.listen(port, () => {
  console.log('App is running on http://localhost:' + port);
});

// prevent dyno from sleeping
setInterval(() => {
  http.get('http://pugbot-ow.herokuapp.com');
}, 900000);
