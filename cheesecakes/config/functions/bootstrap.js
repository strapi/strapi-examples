'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 */

module.exports = cb => {
  // Call App service in app API to init database data.
  strapi.api.app.services.app.initDatabase();

  cb();
};
