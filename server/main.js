import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {
  // code to run on server at startup
  WebApp.connectHandlers.use((request, response, next) => {
    const _id = request.url.slice(1);
    const link = Links.findOne({ _id: _id });
    if (link) {
      response.statusCode = 302;
      response.setHeader('Location', link.url);
      response.end();
      Meteor.call('links.trackVisit', _id);
    }
    else {
      next();
    }
  });
});
