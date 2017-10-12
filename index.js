import { config } from './config';
import { commands } from './commands';
import { PugBot } from './Bot/PugBot';

let pugBot = new PugBot(config);

pugBot.loadCommands(commands);
pugBot.start();