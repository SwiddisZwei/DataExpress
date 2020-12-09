const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb+srv://admin:admin@cluster.hcukc.mongodb.net/dexpr?retryWrites=true&w=majority"
);

let mdb = mongoose.connection;
mdb.on("error", console.error.bind(console, "connection error"));
mdb.once("open", (callback) => {});

let userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  age: Number,
});

let User = mongoose.model("user_collection", userSchema);

exports.index = (req, res) => {
  res.render("index", {
    title: "Home",
  });
};

exports.getSignup = (req, res) => {
  res.render("signup", {
    title: "Sign up",
  });
};

exports.getLogin = (req, res) => {
  res.render("login", {
    title: "Log in",
  });
};

exports.getSettings = (req, res) => {
  res.render("settings", {
    title: "Settings",
  });
};

exports.postSignup = (req, res) => {
  let user = new User(req.body);
  user.password = bcryptjs.hashSync(user.password, 12);

  user.save((err, user) => {
    if (err) return console.error(err);
    console.log("New User " + user);
  });
};

exports.postLogin = (req, res) => {
  User.findById(req.body.username, (err, user) => {
    if (err) return console.error(err);
    if (bcryptjs.compare(req.body.password, user.password)) {
      req.session.user = {
        isAuthenticated: true,
        username: req.body.username,
      };
    }
    res.redirect("/");
  });
};

exports.postSettings = (req, res) => {
  User.updateOne(
    { name: req.session.user.username },
    req.body,
    (err, user) => {}
  );
  res.redirect("/");
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect("/");
    }
  });
};

exports.getData = (req, res) => {
  // TODO
};
