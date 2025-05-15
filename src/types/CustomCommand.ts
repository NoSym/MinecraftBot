import { SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from '@discordjs/builders'
import { Awaitable, CommandInteraction } from 'discord.js'

export type CustomCommand = {
  data: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'> | SlashCommandSubcommandsOnlyBuilder
  enabled: boolean
  execute(interaction: CommandInteraction): Awaitable<void>
}
