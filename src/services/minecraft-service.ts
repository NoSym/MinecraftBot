const url = 'https://api.mojang.com/profiles/minecraft'

type MinecraftUser = {
  id: string
  name: string
}

export class MinecraftService {
  static GetUser = async (username: string): Promise<MinecraftUser> => {
    const body = `[\"${username}\"]`

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'content-length': `${body.length}`,
      },
      body: body,
    })

    if (res.status !== 200) {
      console.log(`Failed to fetch user ${username}\n\n${res.statusText}`)

      throw new Error('Something went wrong beyond my control :(')
    }

    const userInfo = await res.json()

    if (!userInfo || !userInfo.length) {
      console.log(`Minecraft Java user not found ${username}`)

      throw new Error(`Minecraft Java user not found ${username}`)
    }

    return userInfo[0]
  }
}
