const passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('accessToken:', accessToken);
        console.log('refreshToken:', refreshToken);
        console.log('profile:', profile);
        console.log('done:', done);

        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     return cb(err, user);
        // });
    }
));