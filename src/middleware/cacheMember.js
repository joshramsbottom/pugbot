export function cacheMember () {
  return async (next, context) => {
    const { message } = context

    // Obtain the member if we don't have it
    if (message.guild && !message.guild.members.has(message.author.id) && !message.webhookID) {
      message.member = await message.guild.members.fetch(message.author)
    }

    return next(context)
  }
}