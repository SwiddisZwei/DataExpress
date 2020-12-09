const { urlencoded } = require("body-parser");
const express = require("express"),
  expressSession = require("express-session"),
  pug = require("pug"),
  path = require("path"),
  routes = require("./routes/routes"),
  bodyParser = require("body-parser"),
  cookieParser = require('cookie-parser');

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let urlEncodedParser = bodyParser.urlencoded({
  extended: true,
});

const checkAuth = (req, res, next) => {
  if (req.session.user && req.session.user.isAuthenticated) {
    next();
  } else {
    res.redirect("/");
  }
};

app.use(
  expressSession({
    secret: "absolutely_secure",
    saveUninitialized: true,
    resave: true,
  }),
  cookieParser()
);

app.get("/", routes.index);
app.get("/signup", routes.getSignup);
app.post("/signup", urlEncodedParser, routes.postSignup);
app.get("/login", routes.getLogin);
app.post("/login", urlEncodedParser, routes.postLogin);
app.get("/logout", routes.logout);
app.get("/settings", checkAuth, routes.getSettings);
app.post("/settings", checkAuth, urlEncodedParser, routes.postSettings);
app.get("/api", routes.getData);

app.listen(3000);
