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

//mongoose import for DB connection and queries
const mongoose = require("mongoose");

//ejs-mate import
const engine = require("ejs-mate");

//import nodemailer & email template
const nodemailer = require("nodemailer");

//import multer for file upload
const multer = require("multer");

//import imageHosting config
const { storage, cloudinary } = require("./imageHosting");

//setup multer for images
const upload = multer({ storage, limits: { fieldSize: 2 * 1024 * 1024 } }); //2MB limit

//import fileHosting config
const uploadFile = require("./fileHosting");

//import session for user credential storage
const session = require("express-session");

var fs = require("fs");

//import passport for user credentials
const passport = require("passport");

//use local strategy in passport module
const LocalStrategy = require("passport-local");

//import translate to translate english to greek messsages from passport
const translate = require("translate");

//import DB user and course schemas
const User = require("./models/user");
const Course = require("./models/course");

//import connect-flash to flash success/failure messages
const flash = require("connect-flash");

//import MongoDBStore to save session on DB
const MongoDBStore = require("connect-mongo");

//geocoding for mapbox
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });

//import ExpressError class
const ExpressError = require("./erorrHandling/ExpressError");

// import asyncWrapper
const asyncWrapper = require("./erorrHandling/asyncWrapper");
const MongoStore = require("connect-mongo");

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

//use google to translate
translate.engine = "google";

//Use ejs View engine
app.engine("ejs", engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Serve static (image, css, js) files  from public directory. Creates virtual prefix /static
app.use("/static", express.static(path.join(__dirname, "public")));

//Read params from request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

//passport middlewares
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//flash success/failure message middleware & bind logged user to locals for rendering
app.use((req, res, next) => {
  res.locals.loggedUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

//render login page
app.get("/login", (req, res) => {
  res.render("users/loginPage", { topic: "??????????????" });
});

//render all courses page
app.get(
  "/",
  asyncWrapper(async (req, res) => {
    const courses = await Course.find({});
    const users = await User.find({});
    res.render("courses/index", {
      courses,
      users,
      topic: "????????????",
    });
  })
);

//render contact page
app.get("/contact", (req, res) => {
  res.render("contact", { topic: "??????????????????????" });
});

//route for sending contact email
app.post(
  "/contact",
  asyncWrapper(async (req, res) => {
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
      subject: "???????????????????????? ????????????????",
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
              padding-bottom: 50px;
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
          <table style="background-color: #dfbd81; width:100%">
            <div class="container main">
              <div class="container">
                <!-- change link after deploy -->
                <a href="https://stormy-plains-93360.herokuapp.com/"
                  ><img
                    src="https://res.cloudinary.com/dgzlym20q/image/upload/v1654068549/makeItGreen/book_c2vkdg.png"
                    width="130"
                /></a>
              </div>
              <h1>???????????? ?????? ?????????? ????????????????????????</h1>
              <img
                class="logo"
                src="https://cdn-icons-png.flaticon.com/512/4457/4457168.png"
              />
              <p class="content">
                <strong>????????????????????</strong>:
                <a rel="noopener" href="mailto:${req.body.email}" target="_blank"
                  >${req.body.email}</a
                >
              </p>
      
              <p class="content">
                <strong>?????????? ??????????????????</strong>: ${req.body.name}
              </p>
              <p class="content"><strong>????????????</strong>: ${req.body.message}</p>
      
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
            </table>
          </center>
        </body>
      </html>`,
    });
    console.log("Message sent: %s", info.messageId);
    res.render("contact", { topic: "??????????????????????" });
  })
);

//render register page
app.get("/register", async (req, res) => {
  res.render("users/register", { topic: "??????????????" });
});

//register new user route
app.post(
  "/register",
  upload.single("image"),
  asyncWrapper(async (req, res, next) => {
    try {
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
      await newUser.save();
      req.login(newUser, (e) => {
        if (e) return next(e);
        let welcomeName = greekify(name);
        req.flash(
          "success",
          `?????????? ?????????? ${welcomeName} ???????? ???????????????????????? ????????????????!`
        );
        let transporter = nodemailer.createTransport({
          host: "smtp.mail.yahoo.com",
          port: 587,
          secure: false,
          auth: {
            user: process.env.SENDER_USERNAME,
            pass: process.env.SENDER_PASSWORD,
          },
        });
        let info = transporter.sendMail({
          from: process.env.SENDER_USERNAME,
          to: process.env.RECIEVER_USERNAME,
          subject: "???????????????????????? ????????????????",
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
                padding-bottom: 50px;
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
                  <a href="https://stormy-plains-93360.herokuapp.com/"
                    ><img
                      src="https://res.cloudinary.com/dgzlym20q/image/upload/v1654068549/makeItGreen/book_c2vkdg.png"
                      width="130"
                  /></a>
                </div>
                <h1>?? ?????????????????????? ?????? ??????????????????????????!</h1>
                <img
                  class="logo"
                  src="https://res.cloudinary.com/dgzlym20q/image/upload/v1654799063/makeItGreen/7713572_hrdpu6_fccrs3.png"
                />
        
                <p style="font-size: 40px"><strong>???????????????? ??????????????????????</strong></p>
        
                <p class="content"><strong>??????????:</strong>: ${name}</p>
                <p class="content"><strong>??????????????:</strong>: ${surname}</p>
                <p class="content">
                  <strong>Email: </strong>:
                  <a rel="noopener" href="mailto:${email}" target="_blank">${email}</a>
                </p>
        
                <p class="content">
                  <strong>??????????????</strong>: ${password}
                </p>
                <p class="content">???????????????? ???? ???????????????? ???? ???????????????? ?????? ?????? ???? ???????????????????? ???????????????? ?????? ???????????? ??????<p>
        
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
        res.redirect("/");
      });
    } catch (e) {
      const translateError = await translate(e.message, "el");
      req.flash("error", translateError);
      res.redirect("/register");
    }
  })
);

//edit user bio
app.post(
  "/editBio",
  asyncWrapper(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
      ...req.body,
    });
    req.flash("success", "???? ???????????????????? ???????????? ????????????????!");
    res.redirect("/edit");
  })
);

//edit user socials
app.post(
  "/editSocials",
  asyncWrapper(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
      ...req.body,
    });
    req.flash("success", "???? social ?????????????? ????????????????!");
    res.redirect("/edit");
  })
);

//upload new assignment
app.post(
  "/assignmentUpload",
  uploadFile.single("file"),
  asyncWrapper(async (req, res) => {
    try {
      const user = await User.findById(req.user._id);

      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "raw",
        public_id: Date.now() + "-" + req.file.originalname,
      });
      const assignment = {
        path: result.url,
        filename: result.public_id,
        filetype: result.public_id.split(".").pop(),
      };
      user.assignments.push(assignment);
      await user.save();
      req.flash("success", "???? ???????????? ???????????????????????? ????????????????!");
      res.redirect("/edit");
    } catch (e) {
      console.log(e);
      req.flash("error", "???????????? ???????????? ???????????????? ???? ?????? ????????????????????");
      res.redirect("/edit");
    }
  })
);

//toggle assignment visibility
app.post(
  "/toggleVisibility/:id",
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const assignmentId = id.match(/\d+/)[0];
    const visibilityValue = id.replace(/[0-9]/g, "");
    const user = await User.findById(req.user._id);
    user.assignments[parseInt(assignmentId)].visible = visibilityValue;
    await user.save();
    return true;
  })
);

//delete assignment
app.post(
  "/deleteAssignment/:id",
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
    await cloudinary.uploader.destroy(user.assignments[parseInt(id)].filename, {
      resource_type: "raw",
    });
    user.assignments = user.assignments.filter(
      (item) => item !== user.assignments[parseInt(id)]
    );
    await user.save();
    req.flash("success", "???? ???????????? ???????????????????? ????????????????!");
    res.redirect("/edit");
  })
);

//edit user skills
app.post(
  "/editSkills",
  asyncWrapper(async (req, res) => {
    const user = await User.findById(req.user._id);
    const data = req.body.skills;

    //remove skill if skillName is empty
    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === "") {
        data.splice(i, 1);
      }
    }

    //convert array of arrays to array of objects
    const formDataToObject = data.map(([skillName, rating]) => ({
      skillName,
      rating,
    }));
    user.skills = formDataToObject;
    await user.save();
    req.flash("success", "???? skills ?????????????? ????????????????!");
    res.redirect("/edit");
  })
);

//edit user profile image
app.post(
  "/editImage",
  upload.single("image"),
  asyncWrapper(async (req, res) => {
    const user = await User.findById(req.user._id);
    //delete old image file from cloudinary
    await cloudinary.uploader.destroy(user.image.filename);
    user.image = { url: req.file.path, filename: req.file.filename };
    await user.save();
    req.flash("success", "?? ???????????? ???????????? ????????????????!");
    res.redirect("/edit");
  })
);

//edit user profile image of secondary profile
app.post(
  "/editProfileImage/:id",
  upload.single("image"),
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
    //delete old image file from cloudinary
    for (let profile of user.profiles) {
      if (id === profile.origin._id.toString()) {
        try {
          profile.image = { url: req.file.path, filename: req.file.filename };
          await user.save();
          req.flash("success", "?? ???????????? ???????????? ????????????????!");
          res.redirect("/edit");
        } catch (e) {
          console.log(e);
        }
      }
    }
  })
);

//edit user bio of secondary profile
app.post(
  "/editProfileBio/:id",
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
    for (let profile of user.profiles) {
      if (id === profile.origin._id.toString()) {
        profile.bio = req.body.bio;
        await user.save();
      }
    }
    req.flash("success", "???? ???????????????????? ???????????? ????????????????!");
    res.redirect("/edit");
  })
);

//edit user skills of secondary profile
app.post(
  "/editProfileSkills/:id",
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
    const data = req.body.skills;

    //remove skill if skillName is empty
    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === "") {
        data.splice(i, 1);
      }
    }

    //convert array of arrays to array of objects
    const formDataToObject = data.map(([skillName, rating]) => ({
      skillName,
      rating,
    }));
    for (let profile of user.profiles) {
      if (id === profile.origin._id.toString()) {
        profile.skills = formDataToObject;
        await user.save();
      }
    }
    req.flash("success", "???? skills ?????????????? ????????????????!");
    res.redirect("/edit");
  })
);

//toggle visibility of secondary profile assignment
app.post(
  "/toggleVisibility/:id/:courseId",
  asyncWrapper(async (req, res) => {
    const { id, courseId } = req.params;
    const assignmentId = id.match(/\d+/)[0];
    const visibilityValue = id.replace(/[0-9]/g, "");
    const user = await User.findById(req.user._id);
    for (let profile of user.profiles) {
      if (courseId === profile.origin._id.toString()) {
        profile.assignments[parseInt(assignmentId)].visible = visibilityValue;
        await user.save();
      }
    }
    return true;
  })
);

//delete secondary profile assignment
app.post(
  "/deleteAssignment/:i/:id",
  asyncWrapper(async (req, res) => {
    const { i, id } = req.params;
    const user = await User.findById(req.user._id);
    for (let profile of user.profiles) {
      if (id === profile.origin._id.toString()) {
        profile.assignments = profile.assignments.filter(
          (item) => item !== profile.assignments[parseInt(i)]
        );
        await user.save();
      }
    }
    req.flash("success", "???? ???????????? ???????????????????? ????????????????!");
    res.redirect("/edit");
  })
);

//upload new assignment for secondary profile
app.post(
  "/assignmentUpload/:id",
  uploadFile.single("file"),
  asyncWrapper(async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(req.user._id);

      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "raw",
        public_id: Date.now() + "-" + req.file.originalname,
      });
      const assignment = {
        path: result.url,
        filename: result.public_id,
        filetype: result.public_id.split(".").pop(),
      };

      for (let profile of user.profiles) {
        if (id === profile.origin._id.toString()) {
          profile.assignments.push(assignment);
          await user.save();
        }
      }
      req.flash("success", "???? ???????????? ???????????????????????? ????????????????!");
      res.redirect("/edit");
    } catch (e) {
      console.log(e);
      req.flash("error", "???????????? ???????????? ???????????????? ???? ?????? ????????????????????");
      res.redirect("/edit");
    }
  })
);

//edit user info
app.post(
  "/editUser",
  asyncWrapper(async (req, res, next) => {
    const { name, surname, email, uni, address } = req.body;
    const user = await User.findById(req.user._id);
    user.name = name;
    user.surname = surname;
    user.uni = uni;
    user.address = address;
    const geoData = await geocodingClient
      .forwardGeocode({
        query: address,
        limit: 1,
      })
      .send();
    user.geometry = geoData.body.features[0].geometry;
    if (!(email === user.username)) {
      const duplicateUser = await User.findOne({ username: email });
      if (duplicateUser) {
        req.flash("error", "?????????????? ?????? ?????????????? ???? ???????? ???? ??????????");
        res.redirect("/edit");
      }
    }

    user.username = email;
    await user.save();
    req.login(user, (e) => {
      if (e) return next(e);
      req.flash("success", "???? ???????????????? ?????? ????????????????????????!");
      res.redirect("/edit");
    });
  })
);

//login user route
app.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: "?????????? ????????????????! ???????????????? ?????????????????????? ????????",
    failureRedirect: "/login",
  }),
  asyncWrapper(async (req, res) => {
    const name = greekify(req.user.name);
    //if user tried to access something without authorization, return him there after login
    const url = req.session.returnUrl || "/";
    if (req.session.returnUrl) delete req.session.returnTo;
    req.flash("success", `?????????? ???????????? ?????? ???????? ${name}!`);
    res.redirect(url);
  })
);

//render edit profile page
app.get("/edit", async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "profiles",
    populate: {
      path: "origin",
    },
  });
  res.render("users/edit", {
    user,
    topic: "?????????????????????? ????????????",
    nav: "general",
  });
});

//render edit profiles
app.get(
  "/edit/:id",
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(req.user._id).populate({
      path: "profiles",
      populate: {
        path: "origin",
      },
    });
    for (let profile of user.profiles) {
      if (profile.origin._id.toString() === id) {
        res.render("users/editProfile", {
          user,
          topic: "?????????????????????? ????????????",
          nav: profile,
        });
      }
    }
  })
);

//render user page in a course
app.get(
  "/users/:courseId/:userId",
  asyncWrapper(async (req, res) => {
    const { courseId, userId } = req.params;
    const user = await User.findById(userId);
    let userProfile = "";
    for (let i = 0; i < user.profiles.length; i++) {
      if (user.profiles[i].origin.toString() === courseId) {
        userProfile = user.profiles[i];
      }
    }
    res.render("users/showProfile", { user, userProfile });
  })
);

//render course page
app.get(
  "/course/:id",
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    let memberList = [];
    //populate user schema to have coordinates available
    const course = await Course.findById(id).populate("members");

    for (let i = 0; i < course.members.length; i++) {
      for (let j = 0; j < course.members[i].profiles.length; j++) {
        if (course._id.equals(course.members[i].profiles[j].origin)) {
          memberList.push(course.members[i].profiles[j]);
        }
      }
    }
    res.render("courses/show", { memberList, course, topic: course.title });
  })
);

//logout user
app.get("/logout", (req, res) => {
  let name = greekify(req.user.name);
  req.logout((e) => {
    req.flash("success", `?????????? ${name}!`);
    if (e) return next(e);
    res.redirect("/");
  });
});

//add user to course
app.get(
  "/course/join/:id",
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const course = await Course.findById(id);
    course.members.push(req.user._id);
    await course.save();
    const user = await User.findById(req.user._id);
    const newProfile = {
      origin: course._id,
      assignments: [],
      skills: [
        {
          skillName: "Example Skill",
          rating: 50,
        },
      ],
    };
    user.profiles.push(newProfile);
    await user.save();
    req.flash("success", "?????????????????????? ???????? ?????????? ????????????????!");
    res.redirect("/");
  })
);

app.get(
  "/course/delete/:id",
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const course = await Course.findById(id);
    const user = await User.findById(req.user._id);
    for (let i = 0; i < course.members.length; i++) {
      if (course.members[i].equals(user._id)) {
        course.members.splice(i, 1); //remove user from course
      }
    }
    await course.save();
    for (let i = 0; i < user.profiles.length; i++) {
      if (user.profiles[i].origin.equals(id)) {
        user.profiles.splice(i, 1); //remove course from user
      }
    }
    await user.save();
    req.flash("success", "???????????????????????? ?????? ?????? ?????????? ????????????????!");
    res.redirect("/");
  })
);

//render user profile
app.get(
  "/user/:id",
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.render("users/show", { topic: "?????????????? ????????????", user });
  })
);

//edit profile courses
app.get(
  "/edit/assignments",
  asyncWrapper(async (req, res) => {
    const user = await User.findById(req.user._id);
    res.render("users/editAssignments", { topic: "?????????????????????? ????????????" });
  })
);

//delete course
app.get(
  "/course/:id/delete",
  asyncWrapper(async (req, res) => {
    const { id } = req.params;
    await Course.findByIdAndDelete(id);
    req.flash("success", "?? ?????????? ???????????????????? ????????????????!");
    res.redirect("/");
  })
);

// //404 route
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

//error middleware
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "????????????";
  res.status(statusCode).render("error", { err });
});

app.listen(port, () => {
  console.log("Listening on port ", port);
});

//try to use proper greek name syntax
const greekify = (name) => {
  //remove last letter if it is ??
  if (name.charAt(name.length - 1) == "??") {
    name = name.substr(0, name.length - 1);
  }
  //replace last letter with ?? if it is ??
  if (name.charAt(name.length - 1) == "??") {
    name = name.replace(/.$/, "??");
  }
  return name;
};

function convertToArrayOfObjects(data) {
  const keys = data.shift(),
    i = 0,
    k = 0,
    obj = null,
    output = [];

  for (i = 0; i < data.length; i++) {
    obj = {};

    for (k = 0; k < keys.length; k++) {
      obj[keys[k]] = data[i][k];
    }

    output.push(obj);
  }

  return output;
}
