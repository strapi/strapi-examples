'use strict';

const stripe = require('stripe')('sk_test_CbI52CqMj8Cv4bXf822VOGhu');

/**
 * Order.js controller
 *
 * @description: A set of functions called "actions" for managing `Order`.
 */

module.exports = {

  /**
   * Retrieve order records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.order.search(ctx.query);
    } else {
      return strapi.services.order.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a order record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.order.fetch(ctx.params);
  },

  /**
   * Count order records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.order.count(ctx.query);
  },

  /**
   * Create a/an order record.
   *
   * @return {Object}
   */

   create: async (ctx) => {
     const {
       address,
       amount,
       dishes,
       postalCode,
       token,
       city
     } = ctx.request.body;

     const charge = await stripe.charges.create({
       // Transform cents to dollars.
       amount: amount * 100,
       currency: 'usd',
       description: `Order ${new Date()} by ${ctx.state.user._id}`,
       source: token,
     });

     // Register the order in the database
     const order = await strapi.services.order.add({
       user: ctx.state.user._id,
       address,
       amount,
       dishes,
       postalCode,
       city
     });

     return order;
   },

  /**
   * Update a/an order record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.order.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an order record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.order.remove(ctx.params);
  }
};
