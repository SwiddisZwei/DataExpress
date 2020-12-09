const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://admin:admin@cluster.hcukc.mongodb.net/dexpr?retryWrites=true&w=majority");

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

}

exports.postLogin = (req, res) => {

}

exports.postSettings = (req, res) => {

}
