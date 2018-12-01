import {Command} from 'discord.js-commando'

export default class AddCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'add',
      aliases: ['pugs'],
      group: 'pugs',
      memberName: 'add',
      description: 'Add yourself to the queue for next game.',
      guildOnly: true,
      clientPermissions: ['MANAGE_MESSAGES']
    })
  }

  async run(msg) {
    msg.delete()

    const queue = this.client.queue
    const reply = queue.add(msg.member)
    await msg.say(reply)
    return queue.attemptGameStart(msg.guild)
  }
}
