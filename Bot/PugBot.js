import { Client } from 'ghastly';

export class PugBot {

  constructor(config) {
    this.client = new Client({ prefix: '!' });
    this.config = config;
    
    this.client.on('ready', () => {
      console.log("Bot running...");
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
}