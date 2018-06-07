'use strict';

/**
 * Cake.js controller
 *
 * @description: A set of functions called "actions" for managing `Cake`.
 */

module.exports = {

  /**
   * Retrieve cake records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.cake.fetchAll(ctx.query);
  },

  /**
   * Retrieve a cake record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.cake.fetch(ctx.params);
  },

  /**
   * Count cake records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.cake.count(ctx.query);
  },

  /**
   * Create a/an cake record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.cake.add(ctx.request.body);
  },

  /**
   * Update a/an cake record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.cake.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an cake record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.cake.remove(ctx.params);
  }
};
