import { Constants, RichEmbed } from 'discord.js';
import { getFullName } from '../util';

export function game() {

  async function handler({ services }) {
    const queue = services.get('pugs.queue');
    const embed = new RichEmbed();

    embed.setTitle(`List of players added to game - ${queue.getQueueState()}`).setColor(Constants.Colors.GREEN);

    let text = ``;
    queue.queue.forEach(member => {
      text += `${getFullName(member)}\n`
    });
    embed.setDescription(text);

    return embed;
  }

  return {
    handler,
    triggers: ['game'],
    group: 'pugs',
    description: 'Get current pug queue status.',
  };
};