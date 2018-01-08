'use strict';

/**
 * App.js controller
 *
 * @description: A set of functions called "actions" for managing `App`.
 */

module.exports = {

  /**
   * Retrieve app configs.
   *
   * @return {Object}
   */

  info: (ctx) => {
    ctx.send({
      name: strapi.config.name,
      description: strapi.config.description
   });
  }
};
