import { isString } from 'lodash/lang';

export function expectChannel(identifier) {
  // if (!isString(identifier)) {
  //   throw new TypeError('Expected channel identifier to be string.');
  // }

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
