import {Command} from 'discord.js-commando'

import {getRandomMap} from '../../util'

export default class RollMapCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'roll-map',
      aliases: ['rollmap', 'maproll'],
      group: 'pugs',
      memberName: 'roll-map',
      description: 'Roll a random map.',
      guildOnly: true,
      clientPermissions: ['MANAGE_MESSAGES']
    })
  }

  run(msg) {
    msg.delete()

    return msg.say(`Travelling to... ${getRandomMap()}`)
  }
}
