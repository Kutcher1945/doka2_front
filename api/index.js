/**
 * Basic example demonstrating passport-steam usage within Express framework
 * This example uses Express's router to separate the steam authentication routes
 */
const util = require('util')
const express = require('express')
const passport = require('passport')
const session = require('express-session')
const SteamStrategy = require('passport-steam').Strategy
const authRoutes = require('./auth')

const API_2_HOST = process.env.NODE_ENV === 'dev' ? 'http://localhost:3001' : 'https://api2.cybert.online'

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Steam profile is serialized
//   and deserialized.
passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj)
})

// Use the SteamStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier and profile), and invoke a
//   callback with a user object.
passport.use(new SteamStrategy({
  returnURL: `${API_2_HOST}/auth/steam/return`,
  realm: `${API_2_HOST}/`,
  apiKey: '4FCC1F91CE4049BC208BB581F03E7023' // CAB02355559EFA8C187F0642C3AFA4B3 || CAB02355559EFA8C187F0642C3AFA4B3
},
function (identifier, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {
    // To keep the example simple, the user's Steam profile is returned to
    // represent the logged-in user.  In a typical application, you would want
    // to associate the Steam account with a user record in your database,
    // and return that user instead.
    profile.identifier = identifier
    return done(null, profile)
  })
}
))

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(session({
  secret: 'your secret',
  name: 'name of session id',
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

// See views/auth.js for authentication routes
app.use('/auth', authRoutes)

// Commented out - this runs as Nuxt serverMiddleware, not standalone
// app.listen(3001, '0.0.0.0')

app.get('/test', function (req, res) {
  res.send(200, { message: 'test ok' })
})

module.exports = app
