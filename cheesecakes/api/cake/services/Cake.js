'use strict';

/**
 * Cake.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

// Public dependencies.
const _ = require('lodash');

module.exports = {

  /**
   * Promise to fetch all cakes.
   *
   * @return {Promise}
   */

  fetchAll: (params) => {
    const convertedParams = strapi.utils.models.convertParams('cake', params);

    return Cake
      .find()
      .where(convertedParams.where)
      .sort(convertedParams.sort)
      .skip(convertedParams.start)
      .limit(convertedParams.limit)
      .populate(_.keys(_.pickBy(strapi.models.cake.attributes, { autoPopulate: true })).join(' '));
  },

  /**
   * Promise to fetch a/an cake.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    return Cake
      .findOne(params)
      .populate(_.keys(_.pickBy(strapi.models.cake.attributes, { autoPopulate: true })).join(' '));
  },

  /**
   * Promise to add a/an cake.
   *
   * @return {Promise}
   */

  add: (values) => {
    return Cake.create(values);
  },

  /**
   * Promise to edit a/an cake.
   *
   * @return {Promise}
   */

  edit: (params, values) => {
    // Note: The current method will return the full response of Mongo.
    // To get the updated object, you have to execute the `findOne()` method
    // or use the `findOneOrUpdate()` method with `{ new:true }` option.
    return Cake.update(params, values, { multi: true });
  },

  /**
   * Promise to remove a/an cake.
   *
   * @return {Promise}
   */

  remove: params => {
    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    return Cake.findOneAndRemove(params, {});
  }
};
