const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT || 3000;
const app = express();


app.use(bodyParser.json())
.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))

//this is the basic setup for a basic session
.use(passport.initialize())
//initialize the session
.use(passport.session())
//allow passport to use the express session


//console.log('test')
//console.log(app.use(bodyParser.json()));
app.use((req, res,next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS');
  next();
})

.use(cors({methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
.use(cors({ origin: '*'}))
.use('/',require('./routes/index.js'));

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL:process.env.GITHUB_CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  //User.findOrCreate({ githubId: profile.id }, function (err, user) {
  return done(null, profile);
  //});
}
));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user)
});

app.get('/', (req, res) => {
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "logged out")});
  
  app.get('/github/callback', passport.authenticate('github', { 
    failureRedirect: '/api-docs',session: false }),
    (req, res) => {
      // Successful authentication, redirect home.
      req.session.user = req.user;
      res.redirect('/');
    });
    
    //catch all errors, copied from node js site
    process.on('uncaughtException', (err, origin) => {
      console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
    });
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } 
  else {
    app.listen(port, () => {console.log(`Server listening on port ${port}`)});
  }
});

