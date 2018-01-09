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
      .populate(_.keys(_.groupBy(_.reject(strapi.models.cake.associations, {autoPopulate: false}), 'alias')).join(' '));
  },

  /**
   * Promise to fetch a/an cake.
   *
   * @return {Promise}
   */

  fetch: (params) => {
    // Deep populate reviews to get author username
    const populate = [{
      path: 'reviews',
      model: 'Review',
      match: {
        approved: true
      },
      populate: {
        path: 'author',
        model: 'User'
      }
    },
    {
      path: 'categories',
      model: 'Category'
    }];

    return Cake
      .findOne(_.pick(params, _.keys(Cake.schema.paths)))
      .populate(populate);
  },

  /**
   * Promise to add a/an cake.
   *
   * @return {Promise}
   */

  add: async (values) => {
    const data = await Cake.create(_.omit(values, _.keys(_.groupBy(strapi.models.cake.associations, 'alias'))));
    await strapi.hook.mongoose.manageRelations('cake', _.merge(_.clone(data), { values }));
    return data;
  },

  /**
   * Promise to edit a/an cake.
   *
   * @return {Promise}
   */

  edit: async (params, values) => {
    // Note: The current method will return the full response of Mongo.
    // To get the updated object, you have to execute the `findOne()` method
    // or use the `findOneOrUpdate()` method with `{ new:true }` option.
    await strapi.hook.mongoose.manageRelations('cake', _.merge(_.clone(params), { values }));
    return Cake.update(params, values, { multi: true });
  },

  /**
   * Promise to remove a/an cake.
   *
   * @return {Promise}
   */

  remove: async params => {
    // Note: To get the full response of Mongo, use the `remove()` method
    // or add spent the parameter `{ passRawResult: true }` as second argument.
    const data = await Cake.findOneAndRemove(params, {})
      .populate(_.keys(_.groupBy(_.reject(strapi.models.cake.associations, {autoPopulate: false}), 'alias')).join(' '));

    _.forEach(Cake.associations, async association => {
      const search = (_.endsWith(association.nature, 'One')) ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
      const update = (_.endsWith(association.nature, 'One')) ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

      await strapi.models[association.model || association.collection].update(
        search,
        update,
        { multi: true });
    });

    return data;
  },

  /**
   * Promise to count cakes.
   *
   * @return {Promise}
   */

  count: async (ctx) => {
    return Cake.count();
  }
};
