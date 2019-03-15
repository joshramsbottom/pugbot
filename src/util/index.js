export function getFullName(member) {
  return member.user.username + '#' + member.user.discriminator
}

export function getRoleEmoji(member) {
  let roles = ''
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

export function getRandomMap() {
  const maps = [
    // Assault Maps
    'Hanamura',
    'Horizon Lunar Colony',
    'Temple of Anubis',
    'Volskaya Industries',
    'Paris',

    // Escort Maps
    'Dorado',
    'Junkertown',
    'Route 66',
    'Watchpoint: Gibraltar',
    'Rialto',

    // Hybrid Maps
    'Blizzard World',
    'Eichenwalde',
    'Hollywood',
    'King\'s Row',
    'Numbani',

    // Control Maps
    'Ilios',
    'Lijiang Tower',
    'Nepal',
    'Oasis',
    'Busan'
  ]

  return maps[Math.floor(Math.random() * maps.length)]
}
