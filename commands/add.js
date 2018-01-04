export function add() {

  async function handler({ dispatch, message, services }) {
    const queue = services.get('pugs.queue');

    await dispatch(queue.add(message.member));

    return queue.attemptGameStart(message.guild);
  }

  return {
    handler,
    triggers: ['add'],
    group: 'pugs',
  };
};