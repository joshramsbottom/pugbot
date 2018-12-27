import path from 'path'

import PugBotClient from './structures/client'
import { presenceUpdateHandler } from './handlers'
import { expectChannel } from './inhibitors'

const {
  PUGS_CHANNEL,
  OWNERS,
  TOKEN
} = process.env

const client = new PugBotClient({
  commandPrefix: '!',
  unknownCommandResponse: false,
  owner: OWNERS.split(','),
  disableEveryone: true
})

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['pugs', 'Pugs']
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    help: false
  })
  .registerCommandsIn(path.join(__dirname, 'commands'))

client.dispatcher.addInhibitor(expectChannel('pugs', PUGS_CHANNEL))

client.on('ready', () => {
  console.log(`[READY] Logged in as ${client.user.tag}. (${client.user.id})`)
  client.user.setActivity('!h for pugs help')
})

client.on('disconnect', event => {
  console.error(`[DISCONNECT] Disconnected with code ${event.code}.`)
})

client.on('error', err => console.error('[ERROR]', err))

client.on('warn', err => console.warn('[WARNING]', err))

client.on('commandError', (command, err) => console.error('[COMMAND ERROR]', command.name, err))

client.on('presenceUpdate', (oldMember, newMember) => presenceUpdateHandler(oldMember, newMember, client.queue))

client.login(TOKEN)

process.on('unhandledRejection', err => {
  console.error('[FATAL] Unhandled Promise Rejection.', err)
  throw err
})
