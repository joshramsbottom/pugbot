export function scrim() {
  async function handler() {
    return "You're looking for a scrim!";
  }
  
  return {
    handler,
    triggers: ['scrim'],
  };
};