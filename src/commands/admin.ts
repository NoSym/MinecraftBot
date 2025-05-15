import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction, MessageEmbed } from 'discord.js'
import fs from 'node:fs'
import { CustomCommand } from '../types/CustomCommand'

const NAME = 'name'
const REMOVE = 'remove'
const LIST = 'list'

type WhitelistedUser = {
  uuid: string
  name: string
}

const execute = async (interaction: CommandInteraction) => {
  switch (interaction.options.getSubcommand()) {
    case REMOVE:
      removePlayer(interaction)
    case LIST:
      showWhitelist(interaction)
      break
  }
}

const removePlayer = async (interaction: CommandInteraction) => {
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

  await interaction.reply({ content: `Removed ${user.name} from whitelist`, ephemeral: true })
}

const showWhitelist = async (interaction: CommandInteraction) => {
  const whitelistPath = process.env.WHITELIST_PATH!

  const file = fs.readFileSync(whitelistPath, 'utf-8')
  const whitelist: WhitelistedUser[] = JSON.parse(file)
  const whitelistedPlayers = whitelist.map((x) => x.name).join('\n')

  const embeddedResponse = new MessageEmbed().setTitle('Whitelist').setDescription(whitelistedPlayers)

  await interaction.reply({ embeds: [embeddedResponse], ephemeral: true })
}

const admin: CustomCommand = {
  data: new SlashCommandBuilder()
    .setName('admin')
    .setDescription('Whitelist commands')
    .addSubcommand((subcommand) =>
      subcommand
        .setName(REMOVE)
        .setDescription('Remove player from whitelist by username')
        .addStringOption((option) => option.setName(NAME).setDescription('Minecraft java username').setRequired(true))
    )
    .addSubcommand((subcommand) => subcommand.setName(LIST).setDescription('Show whitelist')),
  enabled: true,
  execute,
}

export default admin
