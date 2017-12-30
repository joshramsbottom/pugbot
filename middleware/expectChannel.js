import { isString } from 'lodash/lang';

export function expectChannel(identifiers) {
  identifiers.forEach((id) => {
    if (!isString(id)) {
      throw new TypeError('Expected channel identifiers to be strings.');
    }
  });

  const whitelist = new Set(identifiers);

  return async (next, context) => {
    const {
      message: {
        channel,
      },
    } = context;

    if (whitelist.has(channel.id)) {
      return next(context);
    }

    return false;
  };
}
