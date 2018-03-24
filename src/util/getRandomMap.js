export function getRandomMap () {
  let maps = [
    // Assault Maps
    'Hanamura',
    'Horizon Lunar Colony',
    'Temple of Anubis',
    'Volskaya Industries',
    // Escort Maps
    'Dorado',
    'Junkertown',
    'Route 66',
    'Watchpoint: Gibraltar',
    // Hybrid Maps
    'Blizzard World',
    'Eichenwalde',
    'Hollywood',
    "King's Row",
    'Numbani',
    // Control Maps
    'Ilios',
    'Lijiang Tower',
    'Nepal',
    'Oasis'
  ]

  return 'Travelling to ⇢ ' + maps[Math.floor(Math.random() * maps.length)]
}
