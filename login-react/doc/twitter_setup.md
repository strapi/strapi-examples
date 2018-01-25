# Twitter Setup

Go to the [Twitter app creation page](https://apps.twitter.com/) and create an app called `test-strapi-login`

You won't be able to set your website as `localhost:3000` so enter an url like `http://strapi.io` in order to create your app.

![Twitter 1 setting](../assets/twitter_settings_1.png)

In the settings section fill the form as follows

![Twitter 2 setting](../assets/twitter_settings_2.png)

Then in the permission section check the `Request email addresses from users` field and save

![Twitter 3 setting](../assets/twitter_settings_3.png)



## API setup

Copy your credentials and [go to](http://localhost:1337/admin/plugins/users-permissions/providers) and enable Twitter

![Twitter 4 setting](../assets/admin_twitter_conf.png)
