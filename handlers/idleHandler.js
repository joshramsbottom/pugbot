export function idleHandler(oldMember, newMember, services) {
  if (oldMember.presence.status === newMember.presence.status) {
    return;
  }

  if (newMember.presence.status === 'idle') {
    const queueService = services.get('pugs.queue');

    if (queueService.queue.includes(newMember)) {
      queueService.startIdleTimer(newMember);
    }
  }
};