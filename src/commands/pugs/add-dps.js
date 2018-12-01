import {Command} from 'discord.js-commando'

import {getFullName} from '../../util'

const {DPS_ROLE} = process.env

export default class AddDpsRoleCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'add-dps',
      aliases: ['dps'],
      group: 'pugs',
      memberName: 'add-dps',
      description: 'Add the dps role to yourself for PUGS. Running this again will remove the role.',
      guildOnly: true,
      clientPermissions: ['MANAGE_MESSAGES']
    })
  }

  run(msg) {
    msg.delete()

    const member = msg.member
    if (member.roles.has(DPS_ROLE)) {
      member.removeRole(DPS_ROLE)
      return msg.say(`Removed dps role from ${getFullName(member)}.`)
    }
    member.addRole(DPS_ROLE)
    return msg.say(`Added dps role to ${getFullName(member)}.`)
  }
}
