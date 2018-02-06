import { deleteCommandMsg } from '../middleware'

export function rollMap () {
  async function handler () {
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

    maps.forEach((map, index) => {
      maps[index] = `Travelling to... ${map}`
    })

    return maps
  }

  return {
    handler,
    triggers: ['rollmap', 'rollMap', 'maproll', 'mapRoll'],
    middleware: [
      deleteCommandMsg()
    ],
    description: 'Roll a random map.'
  }
}
