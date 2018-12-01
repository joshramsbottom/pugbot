export function expectChannel(group, channelId) {
  return cmdMsg => {
    // Ensure the command is in the specified command group and channel
    if (cmdMsg.command.group.id === group) {
      if (cmdMsg.channel.id === channelId) {
        return false
      }
      return cmdMsg.say(`I only listen to PUGS commands in ${cmdMsg.guild.channels.get(channelId)}.`)
    }

    return false
  }
}
