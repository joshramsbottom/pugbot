export function deleteCommandMsg () {
  return async (next, context) => {
    const returned = await next(context)

    const { message } = context
    message.delete(1000)

    return returned
  }
}
