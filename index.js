//express imports
const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

//ejs imports
const engine = require("ejs-mate");

//Use ejs View engine
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Serve static (image, css, js) files  from public directory. Creates virtual prefix /static
app.use("/static", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(port, () => {
  console.log("Listening on port ", port);
});
