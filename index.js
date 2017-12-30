import { config } from './config';
import { commands } from './commands';
import { PugBot } from './bot/PugBot';

let pugBot = new PugBot(config);

pugBot.loadCommands(commands);
pugBot.loadServices();
pugBot.whitelistChannels();
pugBot.start();
