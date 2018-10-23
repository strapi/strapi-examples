'use strict';

/**
 * Dish.js controller
 *
 * @description: A set of functions called "actions" for managing `Dish`.
 */

module.exports = {

  /**
   * Retrieve dish records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.dish.search(ctx.query);
    } else {
      return strapi.services.dish.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a dish record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.dish.fetch(ctx.params);
  },

  /**
   * Count dish records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.dish.count(ctx.query);
  },

  /**
   * Create a/an dish record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.dish.add(ctx.request.body);
  },

  /**
   * Update a/an dish record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.dish.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an dish record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.dish.remove(ctx.params);
  }
};
