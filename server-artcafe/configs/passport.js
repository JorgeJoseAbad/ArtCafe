 const User          = require('../models/user');
 const LocalStrategy = require('passport-local').Strategy;
 const bcrypt        = require('bcryptjs'); // !!!
 const passport      = require('passport');

 passport.serializeUser((loggedInUser, cb) => {
   cb(null, loggedInUser._id);
 });

 passport.deserializeUser((userIdFromSession, cb) => {
   User.findById(userIdFromSession, (err, userDocument) => {
     if (err) {
       cb(err);
       return;
     }
     cb(null, userDocument);
   });
 });

 passport.use(new LocalStrategy((username, password, next) => {
   User.findOne({ username }, (err, foundUser) => {
     if (err) {
       next(err);
       return;
     }

     if (!foundUser) {
       console.log("message: 'Incorrect username");
       next(null, false, { message: 'The username do not exist' });
       return;
     }

     if (!bcrypt.compareSync(password, foundUser.password)) {
       next(null, false, { message: 'The password is incorrect' });
       return;
     }

     next(null, foundUser);
   });
 }));
