'use strict';

/**
 * Article.js controller
 *
 * @description: A set of functions called "actions" for managing `Article`.
 */

module.exports = {

  /**
   * Retrieve article records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.article.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a article record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    const data = await strapi.services.article.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an article record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.article.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an article record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.article.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an article record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.article.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
