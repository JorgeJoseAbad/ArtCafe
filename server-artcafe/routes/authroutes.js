const passport = require("passport");
const express = require("express");
const authRoutes = express.Router();

// User model
const User = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


authRoutes.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    // cannot access session here
    //res.redirect("/login");
    res.send({message:'logout made!'})
  });
});

authRoutes.get("/signup", (req, res, next) => {
  res.send('Estoy en auth routes');
  //res.render("auth/signup");
});

authRoutes.post("/signup", (req, res, next) => {

  const username = req.body.username;
  const password = req.body.password;
  const email    = req.body.email;
  const description= req.body.description;
  const isArtist = req.body.isArtist;

  if (username === "" || password === "") {
    res.send({ message: "Indicate username and password" });
    //res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.send({ message: "The username already exists" });
      //res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      email,
      description,
      isArtist
    });

    newUser.save((err) => {
      if (err) {
        res.send({ message: "Something went wrong" });
        //res.render("auth/signup", { message: "Something went wrong" });
      } else {
        res.send({ message: "User Signup made!" });
        //res.redirect("/");
      }
    });
  });
});


/*New login with passport and custom callback*/
authRoutes.post("/login", function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }

    if (!user) { return res.send(info); } //user error in info

    if (user&&info) {return res.send(info);} //password error in info

    req.logIn(user, function(err) {
      if (err) { return next(err); }
      //session data in req.session
      return res.send(
         {  message: "you are logged from autent as: "+req.user.username,
            username:req.user.username,
            _id:req.user._id,
            pic_path:req.user.pic_path
        });
    });
  })(req, res, next);
 },
);



module.exports = authRoutes;
