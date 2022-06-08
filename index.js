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

//import Helmet
const helmet = require("helmet");

//import nodemailer & email template
const nodemailer = require("nodemailer");

//import multer for file upload
const multer = require("multer");

//import imageHosting config
const { storage, cloudinary } = require("./imageHosting");

// setup multer
const upload = multer({ storage, limits: { fieldSize: 2 * 1024 * 1024 } }); //2MB limit

//import uuid to give unique names to uploaded files
const uuid = require("uuid").v4;

//import session for user credential storage
const session = require("express-session");

//import passport for user credentials
const passport = require("passport");

//use local strategy in passport module
const LocalStrategy = require("passport-local");

//import DB user and course schemas
const User = require("./models/user");
const Course = require("./models/course");

//import connect-flash to flash success/failure messages
const flash = require("connect-flash");

//import MongoDBStore to save session on DB
const MongoDBStore = require("connect-mongo");

//connect to DB
const dBUrl = process.env.DB_URL || "mongodb://localhost:27017/thesis";
mongoose.connect(dBUrl, {
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

//allow custom delete, put, patch requests
app.use(methodOverride("_method"));

//session secret
const secret = process.env.SECRET;

//store session in DB
const store = MongoDBStore.create({
  mongoUrl: dBUrl,
  secret,
  touchAfter: 60 * 60 * 24,
});

//error if it fails to save session to DB
store.on("error", (e) => {
  console.log("SESSION DB STORING ERROR", e);
});

//configure session
const sessionConfig = {
  store,
  name: "session",
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60,
    maxAge: 1000 * 60 * 60 * 24,
  },
};

//session middleware
app.use(session(sessionConfig));

//flash-connect middleware
app.use(flash());

//helmet middleware
// app.use(
//   helmet()
// );

//passport middlewares
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//flash success/failure message middleware
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// home route
app.get("/", (req, res) => {
  res.render("home");
});

//course index route
app.get("/courses", async (req, res) => {
  const courses = await Course.find({});
  res.render("courses/index", { courses, topic: "Μαθήματα", calendar: false });
});

//contact route
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

//register route
app.get("/register", (req, res) => {
  res.render("users/register", { topic: "Εγγραφή", calendar: false });
});

//register new user route
app.post("/register", upload.single("image"), async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, surname, email, password } = req.body;
    const user = new User({
      username: email,
      name,
      surname,
    });
    if (req.file) {
      user.image = { url: req.file.path, filename: req.file.filename };
    }
    const newUser = await User.register(user, password);
    req.login(newUser, (err) => {
      if (err) return next(err);
      let welcomeName = name;
      if (welcomeName.charAt(welcomeName.length - 1) == "ς") {
        welcomeName = welcomeName.substr(0, welcomeName.length - 1);
      }
      if (welcomeName.charAt(welcomeName.length - 1) == "ο") {
        welcomeName = welcomeName.replace(/.$/, "ε");
      }
      req.flash(
        "success",
        `Καλώς ήρθες ${welcomeName} στην Εκπαιδευτική Εφαρμογή!`
      );
      res.redirect("/courses");
    });
  } catch (e) {
    console.log(e);
  }
});

//login user route
app.post("/login", (req, res) => {
  res.send("logged in");
});

//edit profile route
app.get("/edit", (req, res) => {
  res.render("users/edit", { topic: "Επεξεργασία Προφίλ", calendar: false });
});

//show course route
app.get("/courses/:id", async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  res.render("courses/show", { course, topic: course.title, calendar: true });
});

//404 route
app.all("*", (req, res) => {
  res.render("error", { topic: "404", calendar: false });
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error", { err });
});

app.listen(port, () => {
  console.log("Listening on port ", port);
});
