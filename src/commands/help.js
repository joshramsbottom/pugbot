import { Constants, RichEmbed } from 'discord.js'

export function help () {
  async function handler ({ commands }) {
    const embed = new RichEmbed()

    embed.setTitle('Pickups Commands')
      .setColor(Constants.Colors.BLUE)

    let text = ``
    text += printCommand(commands.get('help'))
    text += printCommand(commands.get('game'))
    text += printCommand(commands.get('add'))
    text += printCommand(commands.get('done'))
    text += printCommand(commands.get('tank'))
    text += printCommand(commands.get('dps'))
    text += printCommand(commands.get('support'))
    text += printCommand(commands.get('rollMap'))
    embed.setDescription(text)

    embed.addField('How to join in on the action',
      `1. Add your in-game roles (!tank, !dps, !support).
2. Add yourself to the queue (!pugs).
3. When the queue is full, you will be notified.
4. Join the relevant Match Draft voice channel.
5. A moderator will split the teams.
6. Goodluck and have fun!

- Only one map is played per match (BO1).
- Lobby will be created with 'Competitive' preset and killcam off.

Contact gryph#7273 with any suggestions or issues regarding this bot.`)

    return embed
  }

  function printCommand (command) {
    let text = `!${command.name}`
    command.aliases.forEach(alias => {
      text += `, !${alias}`
    })
    return `${text} - ${command.description}\n`
  }

  return {
    handler,
    triggers: ['help', 'h'],
    group: 'pugs',
    description: 'Print this message.'
  }
}
