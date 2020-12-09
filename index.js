const { urlencoded } = require("body-parser");
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
app.get("/signup", routes.getSignup);
app.post("/signup", urlEncodedParser, routes.postSignup);
app.get("/login", routes.getLogin);
app.post("/login", urlEncodedParser, routes.postLogin);
app.get("/settings", routes.getSettings);
app.post("/settings", urlEncodedParser, routes.postSettings);

app.listen(3000);
