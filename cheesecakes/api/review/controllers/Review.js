'use strict';

/**
 * Review.js controller
 *
 * @description: A set of functions called "actions" for managing `Review`.
 */

module.exports = {

  /**
   * Retrieve review records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    const data = await strapi.services.review.fetchAll(ctx.query);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Retrieve a review record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    const data = await strapi.services.review.fetch(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Create a/an review record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const data = await strapi.services.review.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Submit a/an review record.
   *
   * @return {Object}
   */

  submit: async (ctx) => {
    // Set by default variables on submit new review
    ctx.request.body.approved = false;
    ctx.request.body.author = ctx.state.user.id;

    const data = await strapi.services.review.add(ctx.request.body);

    // Send 201 `created`
    ctx.created(data);
  },

  /**
   * Update a/an review record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    const data = await strapi.services.review.edit(ctx.params, ctx.request.body) ;

    // Send 200 `ok`
    ctx.send(data);
  },

  /**
   * Destroy a/an review record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    const data = await strapi.services.review.remove(ctx.params);

    // Send 200 `ok`
    ctx.send(data);
  }
};
