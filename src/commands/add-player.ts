import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'
import fs from 'node:fs'
import { MinecraftService } from '../services/minecraft-service'
import { CustomCommand } from '../types/CustomCommand'

const NAME = 'name'

type WhitelistedUser = {
  uuid: string
  name: string
}

const execute = async (interaction: CommandInteraction) => {
  const whitelistPath = process.env.WHITELIST_PATH!

  const username = interaction.options.getString(NAME, true).trim()

  console.log(`attempting to add ${username} to whitelist`)

  const file = fs.readFileSync(whitelistPath, 'utf-8')
  const whitelist: WhitelistedUser[] = JSON.parse(file)

  const isUserInWhitelist = !!whitelist.find((x) => x.name.toLowerCase() === username.toLowerCase())

  if (isUserInWhitelist) {
    console.log(`${username} is already whitelisted`)
    await interaction.reply({ content: `${username} is already whitelisted` })

    return
  }

  try {
    const user = await MinecraftService.GetUser(username)

    whitelist.push({ uuid: user.id, name: user.name })

    fs.writeFileSync(whitelistPath, JSON.stringify(whitelist))

    console.log(`added ${username} to whitelist`)

    await interaction.reply({ content: `Added ${user.name} to whitelist` })
  } catch (e: any) {
    await interaction.reply(e.message)
  }
}

const addPlayer: CustomCommand = {
  data: new SlashCommandBuilder()
    .setName('whitelist')
    .setDescription('Whitelist minecraft java username')
    .addStringOption((option) => option.setName(NAME).setDescription('Minecraft Java Username').setRequired(true)),
  enabled: true,
  execute,
}

export default addPlayer
