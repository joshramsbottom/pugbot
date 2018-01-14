export function expectChannel(identifier) {

  return async (next, context) => {
    const {
      message: {
        channel,
      },
    } = context;

    if (identifier === channel.id) {
      return next(context);
    }

    return false;
  };
}
