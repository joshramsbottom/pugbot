import { getFullName } from '../util'

export class PugQueue {
  constructor () {
    this.gameCounter = 0
    this.queue = []
    this.idleTimers = new Map()
  }

  getQueueState () {
    return `${this.queue.length}/${process.env.TEAM_SIZE * 2}`
  }

  add (member) {
    const name = getFullName(member)

    if (this.queue.includes(member)) {
      return `${name} is already queued.`
    }

    if (this.queue.length >= 12) {
      return `Queue is full.`
    }

    this.queue.push(member)
    member.addRole(process.env.PUGS_ROLE)

    return `${String.fromCodePoint(0x2705)} ${name} added to queue. ${this.getQueueState()}`
  }

  attemptGameStart (guild) {
    if (this.queue.length < process.env.TEAM_SIZE * 2) {
      return
    }

    this.gameCounter += 1
    const tempChannelName = `pug-${this.gameCounter}`

    let mentions = ``
    this.queue.forEach(member => {
      mentions += `${member}\n`
    })

    guild.createChannel(tempChannelName, 'text').then((channel) => {
      channel.send(`The players for this game are:\n${mentions}`)

      channel.send('Nominate captains and draft teams. This channel will be deleted in an hour.')

      // Start timer to delete channel
      setTimeout(() => {
        channel.delete()
            .then(console.log(`Deleted channel ${tempChannelName}`))
      }, process.env.TEMP_CHANNEL_LIFETIME)

      channel.guild.channels.get(process.env.PUGS_CHANNEL).send(`Game ready to start, draft teams in channel ${channel}.`)
    })

    // Empty queue
    this.queue.length = 0
  }

  startIdleTimer (member) {
    this.idleTimers.set(member.id, setTimeout(() => {
      if (this.removeHelper(member)) {
        const channel = member.guild.channels.get(process.env.PUGS_CHANNEL)
        channel.send(`${String.fromCodePoint(0x274C)} ${getFullName(member)} removed from queue due to idling. ${this.getQueueState()}`)
      }
    }, process.env.IDLE_TIME))
  }

  stopIdleTimer (member) {
    const timeout = this.idleTimers.get(member.id)
    if (timeout !== undefined) {
      clearTimeout(timeout)
    }
  }

  removeHelper (member) {
    member.removeRole(process.env.PUGS_ROLE)

    const memberPos = this.queue.indexOf(member)
    if (memberPos >= 0) {
      this.queue.splice(memberPos, 1)
      return true
    }
    return false
  }

  remove (member) {
    if (this.removeHelper(member)) {
      return `${String.fromCodePoint(0x274C)} ${getFullName(member)} removed from queue. ${this.getQueueState()}`
    }
  }

  removeOffline (member) {
    if (this.removeHelper(member)) {
      const channel = member.guild.channels.get(process.env.PUGS_CHANNEL)
      channel.send(`${String.fromCodePoint(0x274C)} ${getFullName(member)} removed from queue due to going offline. ${this.getQueueState()}`)
    }
  }
}
