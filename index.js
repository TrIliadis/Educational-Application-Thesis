//Loading .env file if not on production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//express imports
const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

//ejs-mate import
const engine = require("ejs-mate");

//Use ejs View engine
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Serve static (image, css, js) files  from public directory. Creates virtual prefix /static
app.use("/static", express.static(path.join(__dirname, "public")));

//Read params from request body
app.use(express.urlencoded({ extended: true }));

latin = {
  name: "latin",
  id: 0,
  students: 5,
  ects: 5,
};
math = {
  name: "math",
  id: 1,
  students: 4,
  ects: 4,
};
algebra = {
  name: "algebra",
  id: 2,
  students: 3,
  ects: 3,
};
const courses = [latin, math, algebra];

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/courses", (req, res) => {
  res.render("courses/index", { courses });
});

app.get("/courses/:id", (req, res) => {
  const { id } = req.params;
  for (let course of courses) {
    if (parseInt(id) === course.id) {
      return res.render("courses/show", { course });
    }
  }
});

app.get("*", (req, res) => {
  res.send("ERROR");
});

app.listen(port, () => {
  console.log("Listening on port ", port);
});
