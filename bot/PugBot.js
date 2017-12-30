import { Client } from 'ghastly';
import { PugQueue } from '../services';
import { expectChannel } from '../middleware';

export class PugBot {

  constructor(config) {
    this.client = new Client({ prefix: '!' });
    this.config = config;

    this.client.on('ready', () => {
      console.log("Bot running...");
    });

    this.client.on('dispatchFail', (reason, context) => {
      switch (reason) {
        case 'handlerError':
          console.log(reason, context);
          break;
        default:
          // do nothing
      }
    });
  }

  start() {
    this.client.login(this.config.token);
  }

  loadCommands(commands) {
    for (let command of commands) {
      this.client.commands.add(command);
    }
  }

  loadServices() {
    this.client.services.singleton('pugs.queue', () => new PugQueue(this.config));
  }

  whitelistChannels() {
    this.client.commands.applyGroupMiddleware('pugs', [
      expectChannel(this.config.channelWhitelist),
    ]);
  }
}
