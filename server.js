/*global __dirname*/

const
  path = require('path'),
  webpack = require('webpack'),
  logger = require('morgan'),
  express = require('express'),
  bodyPasrer = require('body-parser'),
  session = require('express-session'),
  cookieParser = require('cookie-parser'),
  methodOverride = require('method-override'),
  multer = require('multer'),
  config = require('./webpack.config');

const
  join = path.join,
  app = express(),
  upload = multer({dest: 'tmp/'}),
  compiler = webpack(config);

app.set('covers', join(__dirname, './public/images/covers/'));
app.set('avatars', join(__dirname, './public/images/avatars/'));

// require routes:
const
  movies = require('./routes/movies'),
  login = require('./routes/login');

// require middleware:
const admin = require('./lib/middleware/admin');

const
  webpackDevMiddleware = require('webpack-dev-middleware'),
  webpackHotMiddleware = require('webpack-hot-middleware');

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  filename: 'bundle.js',
  stats: {
    colors: true
  },
  historyApiFallback: true
}));
app.use(webpackHotMiddleware(compiler));

const isAuth = function (req, res, next) {
  const uid = req.session.uid;

  if (uid) {
    return next();
  }

  res.status(401).end('Access Denied');
};

app.use(logger('dev'));
app.use(bodyPasrer.json());
app.use(cookieParser('some secret code'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'some secret code'
}));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, './dist')));
app.use(admin());

app.post('/admin/login', login.submit);

app.get('/session', isAuth, function (req, res) {
  res.send(200, res.admin);
});

app.get('/api/movies/', movies.showMovies);
app.post('/api/movies/', isAuth, movies.createMovie);
app.get('/api/movies/count', movies.count);
app.get('/api/movies/genres', movies.genres);
app.get('/api/movies/:id', movies.viewMovie);
app.put('/api/movies/:id', isAuth, movies.updateMovie);
app.delete('/api/movies/:id', isAuth, movies.deleteMovie);
app.post(
  '/api/movies/:id/cover',
  isAuth,
  upload.single('cover'),
  movies.uploadCover.bind(null, app.get('covers'))
);
app.post(
  '/api/movies/:id/avatars',
  isAuth,
  upload.array('avatars'),
  movies.uploadAvatars.bind(null, app.get('avatars'))
);

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'dist', 'app.html'));
});

app.listen(3000, function(err) {
  if (err) {
    return console.error(err); // eslint-disable-line
  }

  console.log('Listening at http://localhost:3000/'); // eslint-disable-line
});
