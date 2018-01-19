import { getFullName } from '../util'

export function addRole (roleId, roleName) {
  async function handler ({ message }) {
    const member = message.member

    if (member.roles.has(roleId)) {
      member.removeRole(roleId)
      return `Removed ${roleName} role from ${getFullName(member)}.`
    } else {
      member.addRole(roleId)
      return `Added ${roleName} role to ${getFullName(member)}.`
    }
  }

  return {
    handler,
    triggers: [`add${roleName}`],
    group: 'pugs',
    description: `Add or remove the ${roleName} role to/from yourself.`
  }
}
