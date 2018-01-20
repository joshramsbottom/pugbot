export function idleHandler (oldMember, newMember, services) {
  if (oldMember.presence.status === newMember.presence.status) {
    return
  }

  const queueService = services.get('pugs.queue')

  if (queueService.queue.includes(newMember) || newMember.roles.has(process.env.PUGS_ROLE)) {
    if (newMember.presence.status === 'idle') {
      queueService.startIdleTimer(newMember)
    } else if (newMember.presence.status === 'offline') {
      queueService.removeOffline(newMember)
    } else if (newMember.presence.status === 'online') {
      queueService.stopIdleTimer(newMember)
    }
  }
}
