import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction, MessageEmbed } from 'discord.js'
import fs from 'node:fs'
import { CustomCommand } from '../types/CustomCommand'

type WhitelistedUser = {
  uuid: string
  name: string
}

const execute = async (interaction: CommandInteraction) => {
  const whitelistPath = process.env.WHITELIST_PATH!

  const file = fs.readFileSync(whitelistPath, 'utf-8')
  const whitelist: WhitelistedUser[] = JSON.parse(file)
  const whitelistedPlayers = whitelist.map((x) => x.name).join('\n')

  const embeddedResponse = new MessageEmbed().setTitle('Whitelist').setDescription(whitelistedPlayers)

  await interaction.reply({ embeds: [embeddedResponse] })
}

const whitelistList: CustomCommand = {
  data: new SlashCommandBuilder().setName('whitelist list').setDescription('Show whitelist'),
  enabled: true,
  execute,
}

export default whitelistList
