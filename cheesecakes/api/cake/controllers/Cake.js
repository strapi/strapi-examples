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
    const data = await strapi.services.cake.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a cake record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    const data = await strapi.services.cake.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an cake record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.cake.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an cake record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.cake.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an cake record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.cake.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
