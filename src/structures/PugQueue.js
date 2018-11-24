import { stripIndents } from 'common-tags'

import { getFullName, getRoleEmoji, getRandomMap } from '../util'

const { TEAM_SIZE, PUGS_ROLE, PUGS_ANNOUNCEMENT_CHANNEL, PUGS_CHANNEL, IDLE_TIME } = process.env

export default class PugQueue {
  constructor () {
    this.queue = []
    this.idleTimers = new Map()
  }

  printQueueState () {
    return `${this.queue.length}/${TEAM_SIZE * 2}`
  }

  add (member) {
    const name = getFullName(member)
    const roleEmoji = getRoleEmoji(member)

    if (this.queue.includes(member)) {
      return `${name} is already queued.`
    }

    if (this.queue.length >= 12) {
      return `Queue is full.`
    }

    this.queue.push(member)
    member.addRole(PUGS_ROLE)

    return `${String.fromCodePoint(0x2705)} ${name} ${roleEmoji} added to queue. ${this.printQueueState()}`
  }

  attemptGameStart (guild) {
    if (this.queue.length < TEAM_SIZE * 2) {
      return
    }

    let mentions = ``
    this.queue.forEach(member => {
      const roleEmoji = getRoleEmoji(member)
      mentions += `${member} ${roleEmoji}\n`
    })

    // Announce game start and alert players
    const announceChannel = guild.client.channels.get(PUGS_ANNOUNCEMENT_CHANNEL)
    const map = getRandomMap()
    announceChannel.send(stripIndents`❮❮❮\t\t **Game Ready!**\t\t ❯❯❯\n
      *Please join Match Draft voice channel:*\n
      ${mentions}\n
      Travelling to... ${map}\n
      ❯❯❯\t\t*end of match announcement*\t\t❮❮❮\n
    `)

    // Notification for queue full
    const pugsChannel = guild.client.channels.get(PUGS_CHANNEL)
    pugsChannel.send(`${TEAM_SIZE * 2} players are ready, match ready to start! Check ${announceChannel} for more details.`)

    // Empty queue
    this.queue.length = 0
  }

  startIdleTimer (member) {
    this.idleTimers.set(member.id, setTimeout(() => {
      if (this.removeHelper(member)) {
        const channel = member.guild.channels.get(PUGS_CHANNEL)
        channel.send(`${String.fromCodePoint(0x274C)} ${getFullName(member)} removed from queue due to idling. ${this.printQueueState()}`)
      }
    }, IDLE_TIME))
  }

  stopIdleTimer (member) {
    const timeout = this.idleTimers.get(member.id)
    if (timeout !== undefined) {
      clearTimeout(timeout)
    }
  }

  removeHelper (member) {
    member.removeRole(PUGS_ROLE)

    const memberPos = this.queue.indexOf(member)
    if (memberPos >= 0) {
      this.queue.splice(memberPos, 1)
      return true
    }
    return false
  }

  remove (member) {
    if (this.removeHelper(member)) {
      return `${String.fromCodePoint(0x274C)} ${getFullName(member)} removed from queue. ${this.printQueueState()}`
    }
  }

  removeOffline (member) {
    if (this.removeHelper(member)) {
      const channel = member.guild.channels.get(PUGS_CHANNEL)
      channel.send(`${String.fromCodePoint(0x274C)} ${getFullName(member)} removed from queue due to going offline. ${this.printQueueState()}`)
    }
  }
}
