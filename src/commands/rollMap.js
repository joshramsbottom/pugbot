import { deleteCommandMsg } from '../middleware'

export function rollMap () {
  async function handler () {
    let maps = [
      'Dorado',
      'Eichenwalde',
      'Hanamura',
      'Hollyword',
      'Ilios',
      "King's Row",
      'Lijiang Tower',
      'Route 66',
      'Numbani',
      'Nepal',
      'Temple of Anubis',
      'Volskaya Industries',
      'Watchpoint: Gibraltar'
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
