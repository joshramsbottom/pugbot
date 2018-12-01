import {Constants, RichEmbed} from 'discord.js'
import {Command} from 'discord.js-commando'
import {stripIndent} from 'common-tags'

export default class HelpCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'help',
      aliases: ['h', 'pugshelp'],
      group: 'pugs',
      memberName: 'help',
      description: 'Print some helpful information about pugs',
      guildOnly: true,
      clientPermissions: ['MANAGE_MESSAGES']
    })
  }

  printCommand(command) {
    let text = `!${command.name}`
    command.aliases.forEach(alias => {
      text += `, !${alias}`
    })
    return `${text} - ${command.description}\n`
  }

  run(msg) {
    msg.delete()

    const embed = new RichEmbed()
    embed.setTitle('Pickups Commands')
      .setColor(Constants.Colors.BLUE)

    const commands = this.client.registry.commands
    let text = ''
    text += this.printCommand(commands.get('help'))
    text += this.printCommand(commands.get('game'))
    text += this.printCommand(commands.get('add'))
    text += this.printCommand(commands.get('remove'))
    text += this.printCommand(commands.get('add-tank'))
    text += this.printCommand(commands.get('add-dps'))
    text += this.printCommand(commands.get('add-support'))
    text += this.printCommand(commands.get('roll-map'))
    embed.setDescription(text)

    embed.addField('How to join pugs',
      stripIndent`
        1. Add your in-game roles (!tank, !dps, !support).
        2. Add yourself to the queue (!pugs).
        3. When the queue is full, you will be notified.
        4. Join the relevant Match Draft voice channel.
        5. A moderator will split the teams.
        6. Lobby will be created and someone will invite you (you might have to add someone else in the game as a friend).
        7. After your match is finished you will need to add yourself to the queue again.
        8. If you want to remove yourself from the queue use !done

        - Matches are BO1.
        - Lobby will be created with 'Competitive' preset and killcam off.

        Contact gryph#7273 with any suggestions or issues regarding this bot.
      `)

    msg.embed(embed)
  }
}
