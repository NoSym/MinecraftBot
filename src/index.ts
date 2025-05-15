// Require the necessary discord.js classes
import { Intents } from 'discord.js'
import 'dotenv/config'
import { CustomClient } from './classes/CustomClient'

// Create a new client instance
const client = new CustomClient({ intents: [Intents.FLAGS.GUILDS] })

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN)
