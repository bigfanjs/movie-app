'use strict';

const
  mongoose = require('mongoose'),
  config = require('../config/'),
  db = mongoose.connect(config.database.uri, {
    server: {
      connectTimeoutMS: 1000000,
      socketTimeoutMS: 1000000
    }
  });

mongoose.Promise = global.Promise;

const
  movie = require('./movie')(mongoose, db),
  admin = require('./admin')(mongoose, db);

const models = { movie, admin };

module.exports = function ( model ) {
  return models[ model ];
};
