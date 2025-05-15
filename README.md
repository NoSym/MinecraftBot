# Typescript Discord Bot Boilerplate
Provides samples and templates to get a new typescript Discord bot up and running fast

## Setup
- Run `npm install` from top level directory
- Create a .env file in top level directory and declare the following environment variables

```
ADMIN_USER_ID
DISCORD_CLIENT_ID
DISCORD_TOKEN
TEST_GUILD_ID
```

## Registering Commands
Slash commands must be registered with the Discord API before users can see them.  
There are two deployment scripts for this.
`npm run deploy-test` will register all commands in the test guild specified by TEST_GUILD_ID, which should take effect immediately.
`npm run deploy-prod` will register *enabled* commands globally, which may take up to an hour to fully propagate.

## Slash Commands, Menus, and Buttons
Examples are provided in help.ts, helpMenu.ts, and sampleButton.ts.  
Buttons may be attached to MessageActionRows in the same way as the provided help menu.  