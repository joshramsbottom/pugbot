import { CommandoClient } from 'discord.js-commando'

import PugQueue from './pug-queue'

export default class PugBotClient extends CommandoClient {
  constructor(options) {
    super(options)

    this.queue = new PugQueue()
  }
}
