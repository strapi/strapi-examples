'use strict';

// Public dependencies.
const _ = require('lodash');

module.exports = {
  initDatabase: async () => {
    const data = await Cake.find();

    if (_.isEmpty(data)) {
      _.forEach(strapi.api.app.config.data, async cake => {
        await strapi.api.cake.services.cake.add(cake);
      });
    }
  }
};
