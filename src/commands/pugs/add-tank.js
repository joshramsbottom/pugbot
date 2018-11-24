import { Command } from 'discord.js-commando'

import { getFullName } from '../../util'

const { TANK_ROLE } = process.env

export default class AddTankRoleCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'add-tank',
      aliases: ['tank'],
      group: 'pugs',
      memberName: 'add-tank',
      description: 'Add the tank role to yourself for PUGS. Running this again will remove the role.',
      guildOnly: true,
      clientPermissions: ['MANAGE_MESSAGES'],
    })
  }

  run(msg) {
    msg.delete()

    const member = msg.member
    if (member.roles.has(TANK_ROLE)) {
      member.removeRole(TANK_ROLE)
      return msg.say(`Removed tank role from ${getFullName(member)}.`)
    } else {
      member.addRole(TANK_ROLE)
      return msg.say(`Added tank role to ${getFullName(member)}.`)
    }
  }
}
