const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const Student = mongoose.model('Student');

passport.serializeUser(function(user, done){
   done(null, user.id);
});

passport.deserializeUser(
    async function(id, done){
    const student = await Student.findById(id);
    done(null, student);
});

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    },
    async function(accessToken, refreshToken, profile, done) {
        const existingStudent = await Student.findOne({googleId:profile.id});
            if(existingStudent) {
                done(null, existingStudent);
            } else {
                const student = await new Student({googleId:profile.id, languages: profile._json.language}).save();
                done(null, student);
            }
    }
));