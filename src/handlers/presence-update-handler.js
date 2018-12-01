export function presenceUpdateHandler(oldMember, newMember, queue) {
  if (oldMember.presence.status === newMember.presence.status) {
    return
  }

  if (queue.includes(newMember)) {
    if (newMember.presence.status === 'idle') {
      queue.startIdleTimer(newMember)
    } else if (newMember.presence.status === 'offline') {
      queue.removeOffline(newMember)
    } else if (newMember.presence.status === 'online') {
      queue.stopIdleTimer(newMember)
    }
  }
}
