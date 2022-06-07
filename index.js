//Loading .env file if not on production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//express imports
const express = require("express");
const app = express();
const path = require("path");

//use port 3000 for development or PORT variable in production
const port = process.env.PORT || 3000;

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

//import nodemailer & email template
const nodemailer = require("nodemailer");

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
app.use(express.json());

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

//route for sending contact email
app.post("/contact", async (req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SENDER_USERNAME,
      pass: process.env.SENDER_PASSWORD,
    },
  });
  let info = await transporter.sendMail({
    from: process.env.SENDER_USERNAME,
    to: process.env.RECIEVER_USERNAME,
    subject: "Εκπαιδευτική Εφαρμογή",
    text: req.body.message,
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          body {
            background-color: var(--white);
            font-family: sans-serif;
          }
    
          .container {
            width: 100%;
            padding-bottom: 20px;
          }
    
          .main {
            background-color: white;
            width: 600px;
            border-radius: 10px;
            padding: 50px;
            background-color: #dfbd81;
          }
    
          .content {
            line-height: 25px;
            text-align: left;
            padding-left: 45px;
          }
    
          .logo {
            width: 150px;
            padding-left: 60px;
            padding-bot: 50px;
          }
    
          .footer {
            width: 600px;
            margin-top: 50px;
          }
    
          .circle {
            border-radius: 50%;
          }
    
          a {
            text-decoration: none;
            padding: 5px;
          }
        </style>
      </head>
      <body>
        <center>
          <div class="container main">
            <div class="container">
              <!-- change link after deploy -->
              <a href="http://localhost:3000/"
                ><img
                  src="https://res.cloudinary.com/dgzlym20q/image/upload/v1654068549/makeItGreen/book_c2vkdg.png"
                  width="130"
              /></a>
            </div>
            <h1>Μήνυμα από φόρμα επικοινωνίας</h1>
            <img
              class="logo"
              src="https://cdn-icons-png.flaticon.com/512/4457/4457168.png"
            />
            <p class="content">
              <strong>Αποστολέας</strong>:
              <a rel="noopener" href="mailto:${req.body.email}" target="_blank"
                >${req.body.email}</a
              >
            </p>
    
            <p class="content">
              <strong>Όνομα Αποστολέα</strong>: ${req.body.name}
            </p>
            <p class="content"><strong>Μήνυμα</strong>: ${req.body.message}</p>
    
            <div class="footer">
              <p>
                <small class="text-muted"
                  >&copy; Copyright June 2022 , CSD AUTH</small
                >
              </p>
              <p>
                <a
                  href=" https://www.facebook.com/triantafillos.iliadis"
                  title="Facebook"
                  target="_blank"
                >
                  <img
                    src="https://res.cloudinary.com/dgzlym20q/image/upload/v1654507514/makeItGreen/facebook_usmnyx.png"
                    alt="Facebook"
                    title="Facebook"
                    width="35"
                  />
                </a>
                <a
                  href=" https://twitter.com/daxakaTI"
                  title="Twitter"
                  target="_blank"
                >
                  <img
                    src="https://res.cloudinary.com/dgzlym20q/image/upload/v1654507523/makeItGreen/twitter_ebol7o.png"
                    alt="Twitter"
                    title="Twitter"
                    width="35"
                  />
                </a>
                <a
                  href=" https://www.linkedin.com/in/triantafyllos-iliadis-b4b9b7234/"
                  title="LinkedIn"
                  target="_blank"
                >
                  <img
                    src="https://res.cloudinary.com/dgzlym20q/image/upload/v1654507521/makeItGreen/linkedin_qztcjf.png"
                    alt="LinkedIn"
                    title="LinkedIn"
                    width="35"
                  />
                </a>
                <a
                  href="https://github.com/TrIliadis/Educational-Application-Thesishttps://github.com/TrIliadis/Educational-Application-Thesis"
                  title="GitHub"
                  target="_blank"
                >
                  <img
                    src="https://res.cloudinary.com/dgzlym20q/image/upload/v1654507518/makeItGreen/github_rokw2r.png"
                    alt="GitHub"
                    title="GitHub"
                    width="35"
                    style="border-radius: 50%"
                  />
                </a>
              </p>
            </div>
          </div>
        </center>
      </body>
    </html>
     `,
  });

  console.log("Message sent: %s", info.messageId);
  res.render("contact", { topic: "Επικοινωνία", calendar: false });
});

app.get("/register", (req, res) => {
  res.render("users/register", { topic: "Εγγραφή", calendar: false });
});

app.get("/login", (req, res) => {
  res.render("users/login", { topic: "Σύνδεση", calendar: false });
});

app.post("/login", (req, res) => {
  res.send("logged in");
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
