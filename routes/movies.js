'use strict';

const
  fs = require('fs'),
  path = require('path'),
  crispy = require('crispy-string'),
  _ = require('lodash'),
  Movie = require('../models')('movie');

const send404 = function (res, err) {
  res.status(404).json({ error: err });
};

const
  generateName = function (len, ext) {
    return crispy.base32String(len || 10) + ext;
  },
  isValidImg = function (mimetype) {
    return /jpg|jpeg|png|gif/i.test( mimetype );
  };

exports.showMovies = function (req, res, next) {
  const
    perPage = 16,
    page = Math.max(0, parseInt(req.query.page) - 1),
    callback = function (err, movies) {
      if ( err ) { return send404(res, err); }

      res.status(200).json( movies );
    };

  var query = req.query;

  const sort = query.sort;

  query = _(query)
    .pickBy((value, key) => key !== 'sort' && key !== 'page' && value.length)
    .mapValues((value, key) => {
      switch(key) {
        case 'title':
          return {$regex: value, $options: 'i'};
        case 'releaseYear':
          return {
            $gte: new Date(value, '1', '1'),
            $lt: new Date(value, '12', '30')
          };
        default:
          return value;
      }
    })
    .mapKeys(function (value, key) {
      return key === 'releaseYear' ? 'releaseDate' : key;
    })
    .value();

  Movie
    .find(query, req.session.uid ? '' : '-meta')
    .limit(perPage)
    .skip(page*perPage)
    .sort(sort)
    .exec(callback);
};

exports.genres = function (req, res, next) {
  Movie.aggregate([
    { $project: { genre: 1 } },
    { $group: { _id: '$genre' } }
  ], (err, result) => {
    if (err) return next(err);

    res.json(result);
  });
};

exports.count = function (req, res, next) {
  Movie.count().exec((err, count) => {
    if (err) { return next(); }

    res.json(count);
  });
};

exports.viewMovie = function (req, res) {
  Movie.findById(req.params.id, '-meta', (err, movie) => {
    if ( err ) { return send404(res, err); }

    res.status(200).json( movie );
  });
};

exports.createMovie = function (req, res) {
  Movie.create(req.body, (err, movie) => {
    if ( err ) { return send404(res, err); }

    res.status( 201 ).json( movie );
  });
};

exports.updateMovie = function (req, res) {
  Movie.update(
    { _id: req.params.id },
    req.body,
    { multi: false },
    (err, movie) => {
      if ( err ) { return send404(res, err); }

      res.status(201).json( movie );
    }
  );
};

exports.deleteMovie = function (req, res) {
  Movie.remove({ _id: req.params.id }, (err, movie) => {
    if ( err ) { return send404(res, err); }

    res.status(204).json( movie );
  });
};

exports.uploadCover = function (dir, req, res, next) {
  var filename, fullpath;

  if (!req.headers['content-type'].match(/multipart\/form-data/)) {
    return res
      .status(400)
      .json({error: 'Invalid content type header.'});
  }

  if (!_.has(req, 'file')) {
    return res
      .status(400)
      .json({error: 'Nothing has uploaded just yet!'});
  }

  if (!isValidImg(req.file.mimetype)) {
    res
      .status(400)
      .json({error: 'Invalid uploaded Image.'});

    return next();
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  do {
    filename = generateName(
      undefined, path.extname(req.file.originalname)
    );
    fullpath = dir + filename;
  } while (fs.existsSync(fullpath));

  const
    wstream = fs.createWriteStream(fullpath),
    rstream = fs.createReadStream(req.file.path);

  const cover = {
    file: filename,
    url: '/images/covers/' + filename
  };

  rstream
    .on('err', function ( err ) {
      res.status(400).json({error: 'Failed Uploading Avatar'});
    })
    .on('end', function () {
      fs.unlink(req.file.path, err => {
        if ( err ) { return next( err ); }

        Movie.findByIdAndUpdate(req.params.id,
          {$set: { cover }},
          (err, movie) => {
            if ( err ) { return next( err ); }

            if (has(movie, 'cover.file')) {
              const prevAvatar = dir + movie.cover.file;

              if (fs.existsSync(prevAvatar)) {
                fs.unlinkSync(prevAvatar);
              }
            }

            res.status(200).json( cover );
          }
        );
      });
    })
    .pipe(wstream);
};

exports.uploadAvatars = function (dir, req, res, next) {
  if (!req.headers['content-type'].match(/multipart\/form-data/)) {
    res.status(400).json({error: 'Invalid content type header!'});
    return next();
  }

  if (!has(req, 'files')) {
    return res
      .status(400)
      .json({error: 'No images uploaded just yet!'});
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  Movie.findById(req.params.id, (err, movie) => {
    if (err) { return next( err ); }

    const promises = [];

    movie.cast = movie.cast.map((actor, idx) => {
      const file = req.files[ idx ];

      let filename, fullpath;

      do {
        filename = generateName(
          undefined, path.extname(file.originalname)
        );
        fullpath = dir + filename;
      } while (fs.existsSync(fullpath));

      const
        wstream = fs.createWriteStream(fullpath),
        rstream = fs.createReadStream(file.path);

      if(has(actor, 'avatar.file')) {
        const prevAvatar = dir + actor.avatar.file;

        if (fs.existsSync(prevAvatar)) {
          fs.unlinkSync(prevAvatar);
        }
      }

      actor.avatar = {
        file: filename,
        url: '/images/avatars/' + filename
      };

      const promise = new Promise((resolve, reject) => {
        rstream
          .on('err', function ( err ) {
            res.status(400).json({error: 'Failed Uploading Avatar'});
          })
          .on('end', function () {
            fs.unlink(file.path, err => {
              if ( err ) { return next( err ); }

              resolve(actor.avatar);
            });
          })
          .pipe(wstream);
      });


      promises.push(promise);

      return actor;
    });

    movie.save((err, updatedMovie) => {
      if ( err ) { return next( err ); }

      Promise
        .all(promises)
        .then(avatars => {
          res.status(200).json(JSON.stringify(avatars));
        });
    });
  });
};
