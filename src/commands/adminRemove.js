import { expectPermissions } from 'ghastly/middleware'
import { getFullName } from '../util'

export function adminRemove () {
  async function handler ({ message, services }) {
    const guild = message.guild
    if (!guild.available) {
      return;
    }

    const queue = services.get('pugs.queue')
    message.mentions.members.forEach(member => {
      queue.removeHelper(member)

      member.send(`You were removed from the pugs queue/role by ${getFullName(message.member)}`)
    })
  }

  return {
    handler,
    triggers: ['adminRemove', 'arem'],
    middleware: [
      expectPermissions('MANAGE_ROLES')
    ]
  }
}