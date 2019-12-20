# VK setup

Go to the [VK developers](https://vk.com/apps?act=manage) and click **Create app**.

![VK setup](../assets/vk_settings__01.png)

Select Website platform, specify title, address and base domain. Click **Connect website**.

![VK setup](../assets/vk_settings__02.png)

Then in the **settings** section set the Authorized redirect URI to `http://localhost:1337/connect/vk/callback`.

![Admin VK Setup](../assets/vk_settings__03.png)

## API Setup

[Go to the Admin](http://localhost:1337/admin/plugins/users-permissions/providers), enable VK and enter your credentials.

![Admin VK Setup](../assets/vk_settings__04.png)

> Go to localhost:3000 and try to sign up with VK
