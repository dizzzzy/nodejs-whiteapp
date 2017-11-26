const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const Student = mongoose.model('Students');

passport.serializeUser(function(user, done){
   done(null, user.id);
});

passport.deserializeUser(function(id, done){
    Student.findById(id).then(function(user){
       done(null, user);
   });
});

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        // console.log('accessToken:', accessToken);
        // console.log('refreshToken:', refreshToken);
        // console.log('profile:', profile);
        Student.findOne({googleId:profile.id}).then(function(existingStudent){
            if(existingStudent) {
                done(null, existingStudent);
            } else {
                new Student({googleId:profile.id, languages: profile._json.language}).save()
                    .then(function(student) {
                        done(null, student);
                    });
            }
        });

    }
));