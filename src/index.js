import { commands } from './commands'
import { PugBot } from './bot/PugBot'

let pugBot = new PugBot()

pugBot.loadCommands(commands)
pugBot.loadServices()
pugBot.applyPugsMiddleware()
pugBot.start()
