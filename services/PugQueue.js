export class PugQueue {

  constructor(config) {
    this.config = config;
    this.gameCounter = 0;
    this.queue = [];
    this.idleTimers = new Map();
  }

  add(member) {
    const name = member.user.username + '#' + member.user.discriminator;

    if (this.queue.includes(member)) {
      return `${name} is already queued.`;
    }

    if (this.queue.length >= 12) {
      return `Queue is full.`;
    }

    this.queue.push(member);
    member.addRole(this.config.pugRole);

    return `${name} added to queue. ${this.queue.length}/${this.config.teamSize * 2}`;
  }

  attemptGameStart(guild) {
    if (this.queue.length < this.config.teamSize * 2) {
      return;
    }

    this.gameCounter += 1;
    const tempChannelName = `pug-${this.gameCounter}`;

    guild.createChannel(tempChannelName, 'text').then((channel) => {
      channel.send('Nominate captains and draft teams. This channel will be deleted in an hour.');

      // Start timer to delete channel
      setTimeout(() => {
        channel.delete()
            .then(console.log(`Deleted channel ${tempChannelName}`));
      }, this.config.tempChannelLifetime)
    });

    // Empty queue
    this.queue.length = 0;

    return `Game ready to start, draft teams in channel ${tempChannelName}.`;
  }

  startIdleTimer(member) {
    this.idleTimers.set(member.id, setTimeout(() => {
      this.remove(member);
    }, this.config.idleTime));
  }

  remove(member) {
    member.removeRole(this.config.pugRole);

    const memberPos = this.queue.indexOf(member);
    if (memberPos >= 0) {
      this.queue.splice(memberPos, 1);
    }

    const channel = member.guild.channels.get(this.config.pugChannel);
    channel.send(`${member.user.username}#${member.user.discriminator} removed from pugs due to idling.`);
  }
}
