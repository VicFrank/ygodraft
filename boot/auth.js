const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const users = require("../db/users");
const keys = require("../config/keys");

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.google.CLIENT_ID,
        clientSecret: keys.google.CLIENT_SECRET,
        callbackURL: process.env.IS_PRODUCTION
          ? "https://ygodraft.net/api/auth/google/callback"
          : "http://localhost:3000/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, cb) => {
        // In this example, the user's Google profile is supplied as the user
        // record.  In a production-quality application, the Google profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
        try {
          const { id, displayName } = profile;
          const user = await users.findOrCreateGoogle(id, displayName);
          return cb(null, user);
        } catch (error) {
          return cb(error, null);
        }
      }
    )
  );

  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  In a
  // production-quality application, this would typically be as simple as
  // supplying the user ID when serializing, and querying the user record by ID
  // from the database when deserializing.  However, due to the fact that this
  // example does not have a database, the complete Google profile is serialized
  // and deserialized.
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });
};
