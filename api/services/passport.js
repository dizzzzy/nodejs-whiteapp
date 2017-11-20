const passport = require('passport'),
    GoogleStrategy = require('passport-google-oauth20').Strategy,
    mongoose = require('mongoose');

const Student = mongoose.model('Students');

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
        new Student({}).save();

    }
));