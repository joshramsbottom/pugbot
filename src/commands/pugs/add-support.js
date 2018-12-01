import { Command } from 'discord.js-commando'

import { getFullName } from '../../util'

const { SUPPORT_ROLE } = process.env

export default class AddSupportRoleCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'add-support',
      aliases: ['support'],
      group: 'pugs',
      memberName: 'add-support',
      description: 'Add the support role to yourself for PUGS. Running this again will remove the role.',
      guildOnly: true,
      clientPermissions: ['MANAGE_MESSAGES']
    })
  }

  run(msg) {
    msg.delete()

    const { member } = msg
    if (member.roles.has(SUPPORT_ROLE)) {
      member.removeRole(SUPPORT_ROLE)
      return msg.say(`Removed support role from ${getFullName(member)}.`)
    }
    member.addRole(SUPPORT_ROLE)
    return msg.say(`Added support role to ${getFullName(member)}.`)
  }
}
