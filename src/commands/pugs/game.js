import { Constants, RichEmbed } from 'discord.js'
import { Command } from 'discord.js-commando'

import { getFullName } from '../../util'

export default class GameCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'game',
      aliases: [],
      group: 'pugs',
      memberName: 'game',
      description: 'Get next pugs game status',
      guildOnly: true,
      clientPermissions: ['MANAGE_MESSAGES'],
    })
  }

  run(msg) {
    msg.delete()

    const queue = this.client.queue
    const embed = new RichEmbed()

    embed.setTitle(`List of players added to game - ${queue.printQueueState()}`).setColor(Constants.Colors.GREEN)

    let text = ``
    queue.queue.forEach(member => {
      text += `${getFullName(member)}\n`
    })
    embed.setDescription(text)

    return msg.say(embed)
  }
}
