// var express = require('express'),
//   session = require('express-session'),
//   passport = require('passport'),
//   SpotifyStrategy = require('../../lib/passport-spotify/index').Strategy;

// var consolidate = require('consolidate');

// var appKey = '<Client ID goes here>';
// var appSecret = '<Client Secret goes here>';

// // Passport session setup.
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });

// // Use the SpotifyStrategy within Passport.
// passport.use(new SpotifyStrategy(
//     {
//       clientID: appKey,
//       clientSecret: appSecret,
//       callbackURL: 'http://localhost:8888/callback'
//     },
//     function(accessToken, refreshToken, expires_in, profile, done) {
//         // asyncrhonous verification, for effect...
//       console.log(accessToken);
//       process.nextTick(function() {
//         console.log('Profile: ', profile)

//         User.findOrCreate({
//             where: {
//                 SpotifyId: profile.id
//             },
//             defaults: {
//                 name: profile.displayName,
//                 SpotifyId: profile.id,
//                 accessToken: accessToken,
//                 proPic: profile.photos[0],
//                 refreshToken: refreshToken
//             }
//         })
//         .spread(function (user) {
//             console.log('MAKING USER: ', user)

//             done(null, user);
//         })
//         .catch(done)
//       });
//     }
//   )
// );

// var app = express();

// // configure Express
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');

// app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// // Initialize Passport!  Also use passport.session() middleware, to support
// // persistent login sessions (recommended).
// app.use(passport.initialize());
// app.use(passport.session());

// app.use(express.static(__dirname + '/public'));

// app.engine('html', consolidate.swig);

// app.get('/', function(req, res) {
//   res.render('index.html', { user: req.user });
// });

// app.get('/account', ensureAuthenticated, function(req, res) {
//   res.render('account.html', { user: req.user });
// });

// app.get('/login', function(req, res) {
//   res.render('login.html', { user: req.user });
// });

// // GET /auth/spotify
// app.get(
//   '/auth/spotify',
//   passport.authenticate('spotify', {
//     scope: ['user-read-email', 'user-read-private'],
//     showDialog: true
//   }),
//   function(req, res) {
//     // The request will be redirected to spotify for authentication, so this
//     // function will not be called.
//   }
// );

// // GET /auth/spotify/callback
// app.get(
//   '/callback',
//   passport.authenticate('spotify', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   }
// );

// app.get('/logout', function(req, res) {
//   req.logout();
//   res.redirect('/');
// });

// app.listen(8888);

// // Simple route middleware to ensure user is authenticated.
// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/login');
// }