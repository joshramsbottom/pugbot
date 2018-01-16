import { Constants, RichEmbed } from 'discord.js';

export function help() {

  async function handler({ commands }) {
    const embed = new RichEmbed();

    embed.setTitle('Pickups Commands')
        .setColor(Constants.Colors.BLUE);

    let text = ``;
    text += printCommand(commands.get('help'));
    text += printCommand(commands.get('game'));
    text += printCommand(commands.get('add'));
    text += printCommand(commands.get('rem'));
    text += printCommand(commands.get('addtank'));
    text += printCommand(commands.get('addflex'));
    text += printCommand(commands.get('adddps'));
    text += printCommand(commands.get('addsupport'));
    text += printCommand(commands.get('rollMap'));
    embed.setDescription(text);

    embed.addField('How to pickup',
        `- Make sure you have the relevant roles with regards to hero pool.
- Add yourself to the pugs queue, which allows you to view voice channels, !pugs.
- When the queue is full, a temporary text channel will be created for picking captains and teams for that game.
- Everyone vote on 2 captains, Don't pick the same people to be captain every map.
- Captains each select players 1 at a time.
- When a player has been selected for a team they must go to relevant voice channel.
- Lobby settings should use VS rules.
- Start again for next round of pugs.

Contact gryph#7273 with any suggestions or issues regarding this bot.`);
    
    return embed;
  }

  function printCommand(command) {
    let text = `!${command.name}`;
    command.aliases.forEach(alias => {
      text += `, !${alias}`;
    });
    return `${text} - ${command.description}\n`;
  }

  return {
    handler,
    triggers: ['help', 'h', 'pugshelp'],
    group: 'pugs',
    description: 'Print this message.',
  }
}