# VK setup

Go to the [VK developers](https://vk.com/apps?act=manage) and create app.

![VK setup](../assets/vk_settings__01.png)

Then in the credentials section set the Authorized redirect URI to `http://localhost:1337/connect/vk/callback`

![VK setup](../assets/vk_settings__02.png)

## API Setup

[Go to the Admin](http://localhost:1337/admin/plugins/users-permissions/providers), enable VK and enter your credentials.

![Admin VK Setup](../assets/vk_settings__03.png)

> Go to localhost:3000 and try to sign up with VK
