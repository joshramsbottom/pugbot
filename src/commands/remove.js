export function remove () {
  async function handler ({ message, services }) {
    const queue = services.get('pugs.queue')

    return queue.remove(message.member)
  }

  return {
    handler,
    triggers: ['remove', 'rem', 'pugsdone', 'done'],
    group: 'pugs',
    description: 'Remove yourself from the pugs queue.'
  }
}
