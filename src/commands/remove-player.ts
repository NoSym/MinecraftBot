import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'
import fs from 'node:fs'
import { CustomCommand } from '../types/CustomCommand'

const NAME = 'name'

type WhitelistedUser = {
  uuid: string
  name: string
}

const execute = async (interaction: CommandInteraction) => {
  const whitelistPath = process.env.WHITELIST_PATH!

  const username = interaction.options.getString(NAME, true).trim()

  console.log(`attempting to remove ${username} from whitelist`)

  const file = fs.readFileSync(whitelistPath, 'utf-8')
  const whitelist: WhitelistedUser[] = JSON.parse(file)

  const user = whitelist.find((x) => x.name.toLowerCase() === username.toLowerCase())

  if (!user) {
    console.log(`${username} is not whitelisted`)
    await interaction.reply({ content: `${username} is not whitelisted` })
    return
  }

  const newWhitelist = whitelist.filter((x) => x.name !== user.name)

  fs.writeFileSync(whitelistPath, JSON.stringify(newWhitelist))

  console.log(`Removed ${user.name} from whitelist`)

  await interaction.reply({ content: `Removed ${user.name} from whitelist` })
}

const removePlayer: CustomCommand = {
  data: new SlashCommandBuilder()
    .setName('whitelist remove')
    .setDescription('Remove player from whitelist by username')
    .addStringOption((option) => option.setName(NAME).setDescription('Minecraft Java Username').setRequired(true)),
  enabled: true,
  execute,
}

export default removePlayer
