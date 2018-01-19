import { Client } from 'ghastly'
import { PugQueue } from '../services'
import { expectChannel, deleteCommandMsg } from '../middleware'
import { idleHandler } from '../handlers'

export class PugBot {
  constructor () {
    this.client = new Client({ prefix: '!' })

    this.client.on('ready', () => {
      console.log('Bot running...')
      this.client.user.setActivity('!h for help')
    })

    this.client.on('dispatchFail', (reason, context) => {
      switch (reason) {
        case 'handlerError':
          console.log(reason, context)
          break
        default:
          // do nothing
      }
    })

    this.client.on('presenceUpdate', (oldMember, newMember) => {
      idleHandler(oldMember, newMember, this.client.services)
    })
  }

  start () {
    this.client.login(process.env.TOKEN)
  }

  loadCommands (commands) {
    for (let command of commands) {
      this.client.commands.add(command)
    }
  }

  loadServices () {
    this.client.services.singleton('pugs.queue', () => new PugQueue())
  }

  applyPugsMiddleware () {
    this.client.commands.applyGroupMiddleware('pugs', [
      expectChannel(process.env.PUGS_CHANNEL),
      deleteCommandMsg()
    ])
  }
}
