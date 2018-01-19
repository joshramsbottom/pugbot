export function add () {
  async function handler ({ dispatch, message, services }) {
    const queue = services.get('pugs.queue')

    await dispatch(queue.add(message.member))

    return queue.attemptGameStart(message.guild)
  }

  return {
    handler,
    triggers: ['add', 'pugs'],
    group: 'pugs',
    description: 'Add yourself to the pug queue for the next game.'
  }
}
