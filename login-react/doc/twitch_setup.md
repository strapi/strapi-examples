# Twitch Setup

Go to the [Twitch Developers](https://glass.twitch.tv/console/apps) console and create an app.
- For **OAuth Redirect URL**, use `http://localhost:1337/connect/twitch/callback`
- Under **Category** select `Website Integration`
- Once you save the form, click `Manage` for the application you just created
- At the bottom of the page, click the `New Secret` button

![Twitch Setup](../assets/twitch_settings.png)

## API Setup

[Go to the Admin](http://localhost:1337/admin/plugins/users-permissions/providers), enable Twitch and enter your credentials.

![Admin Twitch Setup](../assets/admin_twitch_conf.png)

Go to http://localhost:3000 and try to sign up with Twitch
