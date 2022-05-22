//Loading .env file if not on production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//express imports
const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

//Use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
const methodOverride = require("method-override");

//mongoose import for DB connection and queries
const mongoose = require("mongoose");

//ejs-mate import
const engine = require("ejs-mate");

//import Schemas
const Course = require("./models/course");

//import Helmet
const helmet = require("helmet");

//connect to DB
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/thesis";
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

//Use ejs View engine
app.engine("ejs", engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Serve static (image, css, js) files  from public directory. Creates virtual prefix /static
app.use("/static", express.static(path.join(__dirname, "public")));

//Read params from request body
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/courses", async (req, res) => {
  const courses = await Course.find({});
  res.render("courses/index", { courses, topic: "Μαθήματα", calendar: false });
});

app.get("/contact", (req, res) => {
  res.render("contact", { topic: "Επικοινωνία", calendar: false });
});

app.get("/register", (req, res) => {
  res.render("users/register", { topic: "Εγγραφή", calendar: false });
});

app.get("/login", (req, res) => {
  res.render("users/login", { topic: "Σύνδεση", calendar: false });
});

app.get("/edit", (req, res) => {
  res.render("users/edit", { topic: "Επεξεργασία Προφίλ", calendar: false });
});

app.get("/courses/:id", async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  res.render("courses/show", { course, topic: course.title, calendar: true });
});

app.get("*", (req, res) => {
  res.render("error", { topic: "404", calendar: false });
});

app.listen(port, () => {
  console.log("Listening on port ", port);
});
