# Discord setup

Go to the [Discord developers](https://discordapp.com/developers/applications/) and create an app.

Under OAuth2, add the redirect `http://localhost:1337/connect/discord/callback`

![Discord General Information](../assets/discord_settings_1.png)
![Discord OAuth2 Settings](../assets/discord_settings_2.png)



## API Setup

[Go to the Admin](http://localhost:1337/admin/plugins/users-permissions/providers), enable Discord and enter your credentials.

![Admin Discord Setup](../assets/admin_discord_conf.png)


> Go to localhost:3000 and try to sign up with discord
