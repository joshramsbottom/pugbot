export function remove () {
  async function handler ({ message, services }) {
    const queue = services.get('pugs.queue')

    return queue.remove(message.member)
  }

  return {
    handler,
    triggers: ['remove', 'rem', 'pugsdone'],
    group: 'pugs',
    description: 'Remove yourself from the pug queue.'
  }
}
