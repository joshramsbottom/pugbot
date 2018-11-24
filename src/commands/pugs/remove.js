import { Command } from 'discord.js-commando'

export default class RemoveCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'remove',
      aliases: ['rem', 'pugsdone', 'done'],
      group: 'pugs',
      memberName: 'remove',
      description: 'Remove yourself from the queue for the next game.',
      guildOnly: true,
      clientPermissions: ['MANAGE_MESSAGES'],
    })
  }

  run(msg) {
    msg.delete()

    return msg.say(this.client.queue.remove(msg.member))
  }
}
