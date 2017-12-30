export function ping() {

  async function handler() {
    return 'pong!';
  }

  return {
    handler,
    triggers: ['ping'],
  };

};
