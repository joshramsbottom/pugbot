import { Command } from 'discord.js-commando'

import { getFullName } from '../../util'
import { insertBattleTag } from '../../util/database'

export default class BattleTagCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'battletag',
      aliases: ['bt'],
      group: 'pugs',
      memberName: 'battletag',
      description: 'Link your BattleTag to pugbot',
      guildOnly: true,
      clientPermissions: ['MANAGE_MESSAGES'],
      args: [
        {
          key: 'battletag',
          prompt: 'What battletag would you like to link to pugbot?',
          type: 'string'
        }
      ]
    })
  }

  async run(msg, { battletag }) {
    // TODO: Make this regex work
    // const pattern = new RegExp('^[\p{L}\p{Mn}][\p{L}\p{Mn}0-9]{2,11}-[0-9]{4,5}+$', 'u')
    // if (!pattern.test(battletag)) {
    //   return msg.say(`BattleTag ${battletag} is invalid!`)
    // }

    msg.delete()

    const insertedCount = await insertBattleTag(msg.author.id, battletag)
    if (insertedCount) {
      return msg.say(`BattleTag ${battletag} linked to ${getFullName(msg.member)}`)
    }

    return msg.say(`BattleTag for ${getFullName(msg.member)} could not be inserted`)
  }
}
