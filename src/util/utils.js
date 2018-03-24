export function getFullName (member) {
  return member.user.username + '#' + member.user.discriminator
}

export function getRoleEmoji (member) {
  let roles = ``
  if (member.roles.has(process.env.DPS_ROLE)) {
    roles += process.env.DPS_EMOJI
  }
  if (member.roles.has(process.env.TANK_ROLE)) {
    roles += process.env.TANK_EMOJI
  }
  if (member.roles.has(process.env.SUPPORT_ROLE)) {
    roles += process.env.SUPPORT_EMOJI
  }
  return roles
}
