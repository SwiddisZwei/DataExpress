const express = require("express"),
  pug = require("pug"),
  path = require("path"),
  routes = require("./routes/routes"),
  bodyParser = require("body-parser");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let urlEncodedParser = bodyParser.urlencoded({
  extended: true,
});

app.get("/", routes.index);
app.get("/signup", routes.signup);
app.get("/login", urlEncodedParser, routes.login);
app.get("/settings", routes.settings);

app.listen(3000);
