
const express = require("express");
const authRoutes = express.Router();

// User model
const User = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


authRoutes.get("/logout", (req, res, next) => {
  console.log("llamada a logout");
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

authRoutes.post("/login", (req, res, next) => {
  var username = req.body.username;
  var password = req.body.password;

  if (username === "" || password === "") {
    res.send({message: "The username or password doesn't exist"})
    //res.render("auth/login", {
    //  errorMessage: "Indicate a username and a password to sign up"
    //});
    return;
  }

  User.findOne({ "username": username }, (err, user) => {
      if (err || !user) {
        res.send({message: "The username doesn't exist"});
        //res.render("auth/login", {
        //  errorMessage: "The username doesn't exist"
        //});
        return;
      }
      if (bcrypt.compareSync(password, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        console.log(user);
        res.send({message: "you are logged as: "+req.session.currentUser.username,
        username:req.session.currentUser.username
      }) //an eye to this
        //res.redirect("/");
      } else {
        res.send({message: "The password is incorrect"})
        //res.render("auth/login", {
        //  errorMessage: "Incorrect password"
        //});
      }
  });
});



module.exports = authRoutes;
