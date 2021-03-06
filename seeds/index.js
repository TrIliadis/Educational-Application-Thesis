const mongoose = require("mongoose");
const Course = require("../models/course");
const User = require("../models/user");
const courses = require("./courses");
const profiles = require("./profiles");
const randomName = require("node-random-name");
const randomLocation = require("random-location");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({
  accessToken:
    "pk.eyJ1IjoiZGF4YWthIiwiYSI6ImNsMXhicW1odTAxYWgzZG1tODVtcjRnYmQifQ.p0DZDL3qMIzWsdHrRxgj4Q",
});
let courseList = [];

mongoose.connect("mongodb://localhost:27017/thesis", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

//generate random dates for seeds
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

//randomize array order
function shuffle(array) {
  var i = array.length,
    j = 0,
    temp;
  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    // swap randomly chosen element with current element
    temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

//Dummy seed DB
const seedDB = async () => {
  //delete course and user collection data to re-seed them
  await Course.deleteMany({});
  await User.deleteMany({});

  for (let i = 0; i < courses.length; i++) {
    const course = new Course({
      title: courses[i].title,
      description: courses[i].description,
      created: randomDate(new Date(1991, 22, 08), new Date()),
      lastActive: new Date().toLocaleDateString(),
      images: courses[i].image,
    });
    await course.save();
    console.log(course);
    courseList.push(course);
  }

  for (let i = 0; i < 200; i++) {
    const user = new User({
      name: randomName({ first: true, random: Math.random }),
      surname: randomName({ last: true, random: Math.random }),
      username: `user${i}@user${i}`,
      uni: "CSD, AUTH",
    });
    user.facebook = `${user.name + " " + user.surname}`;
    user.instagram = `@${user.name}`;
    user.twitter = `@${user.surname}`;

    if (i % 10 == 0) user.role = "teacher";
    else user.role = "student";

    const profilePicker = shuffle([0, 1, 2, 3, 4]); //randomize order of numbers

    //pick first 3 numbers of profilePicker to add to the profiles from courses
    const newProfile0 = {
      origin: courseList[profilePicker[0]]._id,
      image: profiles[profilePicker[0]].image,
      bio: profiles[profilePicker[0]].bio,
      assignments: profiles[profilePicker[0]].assignments,
      skills: profiles[profilePicker[0]].skills,
    };

    const newProfile1 = {
      origin: courseList[profilePicker[1]]._id,
      image: profiles[profilePicker[1]].image,
      bio: profiles[profilePicker[1]].bio,
      assignments: profiles[profilePicker[1]].assignments,
      skills: profiles[profilePicker[1]].skills,
    };

    const newProfile2 = {
      origin: courseList[profilePicker[2]]._id,
      image: profiles[profilePicker[2]].image,
      bio: profiles[profilePicker[2]].bio,
      assignments: profiles[profilePicker[2]].assignments,
      skills: profiles[profilePicker[2]].skills,
    };

    user.profiles.push(newProfile0);
    user.profiles.push(newProfile1);
    user.profiles.push(newProfile2);

    const course0 = await Course.findById(courseList[profilePicker[0]]);
    const course1 = await Course.findById(courseList[profilePicker[1]]);
    const course2 = await Course.findById(courseList[profilePicker[2]]);

    user.bio =
      "???????????????????? ?????????????????????????? ??????????????, ?????????? ???????????????? ???????? ?????????????????????? ?????????? ?????? ?????????????????????????? ?????????????????????????? ???????????????????????? ?????? ?????????????????? ?????? ???? ??????????. ???????? ???????????????? ?????? ?????????? ???????????????????? ???? ???? ????????????????????, ???? web development ?????? ???? gaming. ???????????????????????? ?????????????????? ?????? web development ?????? ?????????? ???????? ???? ???? ?????????? ???? ?????????? ???? ???????????????? ?????????????????????????? ????????????????????. ???????? ?? ???????????????? ?????????????? ?????????? ???? ?????? ???????????????????? ?????????????????????? (js, node, express) ?????? ?????????? ???????? ?? ?????????? ???????????????? ???????? ?????????? ?????? web developemt ?????? ???????????? ???????????? ?????? ???????????? ?????????????? ???????? ?????? ???????? ?????????????????????? ???????????????????????? ???????????? ?????? ???????????? (Journaling).";

    const j = Math.floor(Math.random() * 200);
    if (j < 20) {
      user.image.url =
        "https://res.cloudinary.com/dgzlym20q/image/upload/v1656530068/makeItGreen/photo-1607746882042-944635dfe10e_bpcduk.jpg";
      user.image.filename = "photo-1607746882042-944635dfe10e_bpcduk.jpg";
    } else if (j < 40) {
      user.image.url =
        "https://res.cloudinary.com/dgzlym20q/image/upload/v1656530050/makeItGreen/photo-1519456264917-42d0aa2e0625_bjy2iu.jpg";
      user.image.filename = "photo-1519456264917-42d0aa2e0625_bjy2iu.jpg";
    } else if (j < 60) {
      user.image.url =
        "https://res.cloudinary.com/dgzlym20q/image/upload/v1656530030/makeItGreen/photo-1472099645785-5658abf4ff4e_ppwzpp.jpg";
      user.image.filename = "photo-1472099645785-5658abf4ff4e_ppwzpp.jpg";
    } else if (j < 80) {
      user.image.url =
        "https://res.cloudinary.com/dgzlym20q/image/upload/v1656529974/makeItGreen/photo-1558898479-33c0057a5d12_bcffeb.jpg";
      user.image.filename = "photo-1558898479-33c0057a5d12_bcffeb.jpg";
    } else if (j < 100) {
      user.image.url =
        "https://res.cloudinary.com/dgzlym20q/image/upload/v1656529955/makeItGreen/photo-1508214751196-bcfd4ca60f91_qdat2w.jpg";
      user.image.filename = "photo-1508214751196-bcfd4ca60f91_qdat2w.jpg";
    } else if (j < 120) {
      user.image.url =
        "https://res.cloudinary.com/dgzlym20q/image/upload/v1656529938/makeItGreen/photo-1628890923662-2cb23c2e0cfe_myg4sy.jpg";
      user.image.filename = "photo-1628890923662-2cb23c2e0cfe_myg4sy.jpg";
    } else if (j < 140) {
      user.image.url =
        "https://res.cloudinary.com/dgzlym20q/image/upload/v1656529912/makeItGreen/photo-1603415526960-f7e0328c63b1_crdf3d.jpg";
      user.image.filename = "photo-1603415526960-f7e0328c63b1_crdf3d.jpg";
    } else if (j < 160) {
      user.image.url =
        "https://res.cloudinary.com/dgzlym20q/image/upload/v1656496202/makeItGreen/photo-1463453091185-61582044d556_xj5dix.jpg";
      user.image.filename = "photo-1463453091185-61582044d556_xj5dix.jpg";
    } else if (j < 180) {
      user.image.url =
        "https://res.cloudinary.com/dgzlym20q/image/upload/v1656496187/makeItGreen/photo-1438761681033-6461ffad8d80_p4x06p.jpg";
      user.image.filename = "photo-1438761681033-6461ffad8d80_p4x06p.jpg";
    } else {
      user.image.url =
        "https://res.cloudinary.com/dgzlym20q/image/upload/v1656496172/makeItGreen/photo-1619895862022-09114b41f16f_pz0oeg.jpg";
      user.image.filename = "photo-1619895862022-09114b41f16f_pz0oeg.jpg";
    }

    user.skills = [
      {
        skillName: "Frontend development",
        rating: 85,
      },
      {
        skillName: "Backend development",
        rating: 70,
      },
      {
        skillName: "Database design",
        rating: 50,
      },
      {
        skillName: "Security",
        rating: 30,
      },
    ];

    user.assignments = [
      {
        path: "https://res.cloudinary.com/dgzlym20q/raw/upload/v1656519524/1656519528267-3145765.png",
        filename: "1656519528267-3145765.png",
        filetype: "png",
        submitted: randomDate(new Date(1991, 22, 08), new Date()),
      },
      {
        path: "https://res.cloudinary.com/dgzlym20q/raw/upload/v1656520742/1656520744539-kanonismos_eponisis_ptyhiakis_ergasias_tmimatos_k.e._8-4-2016.pdf",
        filename:
          "1656520744539-kanonismos_eponisis_ptyhiakis_ergasias_tmimatos_k.e._8-4-2016.pdf",
        filetype: "pdf",
        submitted: randomDate(new Date(1991, 22, 08), new Date()),
      },
      {
        path: "https://res.cloudinary.com/dgzlym20q/raw/upload/v1656519414/1656519417940-testAssignment.txt",
        filename: "1656519417940-testAssignment.txt",
        filetype: "txt",
        submitted: randomDate(new Date(1991, 22, 08), new Date()),
      },
      {
        path: "https://res.cloudinary.com/dgzlym20q/raw/upload/v1656519353/1656519356948-testAssignment.docx",
        filename: "1656519356948-testAssignment.docx",
        filetype: "docx",
        submitted: randomDate(new Date(1991, 22, 08), new Date()),
      },
      {
        path: "https://res.cloudinary.com/dgzlym20q/raw/upload/v1656519300/1656519302803-sampleppt.ppt",
        filename: "1656519302803-sampleppt.ppt",
        filetype: "ppt",
        submitted: randomDate(new Date(1991, 22, 08), new Date()),
      },
    ];

    if (i >= 0 && i < 35) {
      const P = {
        latitude: 40.66134125975323,
        longitude: 22.92316532188167,
      };

      const R = 20000; // meters

      const randomPoint = randomLocation.randomCirclePoint(P, R);

      user.geometry.coordinates[0] = randomPoint.longitude;
      user.geometry.coordinates[1] = randomPoint.latitude;

      const geo = async () => {
        const data = await geocodingClient
          .reverseGeocode({
            query: [randomPoint.longitude, randomPoint.latitude],
          })
          .send();
        user.address = "";
        user.address = JSON.parse(data.rawBody).features[0]?.place_name;

        if (
          typeof JSON.parse(data.rawBody).features[0]?.place_name !==
          "undefined"
        ) {
          user.address = JSON.parse(data.rawBody).features[0]?.place_name;
        }
      };

      geo();
    }

    if (i >= 35 && i < 70) {
      const P = {
        latitude: 39.68677263649146,
        longitude: 22.417089950082282,
      };

      const R = 20000; // meters

      const randomPoint = randomLocation.randomCirclePoint(P, R);
      user.geometry.coordinates[0] = randomPoint.longitude;
      user.geometry.coordinates[1] = randomPoint.latitude;
      const geo = async () => {
        const data = await geocodingClient
          .reverseGeocode({
            query: [randomPoint.longitude, randomPoint.latitude],
          })
          .send();
        if (
          typeof JSON.parse(data.rawBody).features[0]?.place_name !==
          "undefined"
        ) {
          user.address = JSON.parse(data.rawBody).features[0]?.place_name;
        }
      };

      geo();
    }

    if (i >= 70 && i < 105) {
      const P = {
        latitude: 38.11984697479902,
        longitude: 23.72072619191772,
      };

      const R = 20000; // meters

      const randomPoint = randomLocation.randomCirclePoint(P, R);
      user.geometry.coordinates[0] = randomPoint.longitude;
      user.geometry.coordinates[1] = randomPoint.latitude;
      const geo = async () => {
        const data = await geocodingClient
          .reverseGeocode({
            query: [randomPoint.longitude, randomPoint.latitude],
          })
          .send();
        if (
          typeof JSON.parse(data.rawBody).features[0]?.place_name !==
          "undefined"
        ) {
          user.address = JSON.parse(data.rawBody).features[0]?.place_name;
        }
      };

      geo();
    }

    if (i >= 105 && i < 140) {
      const P = {
        latitude: 37.572968352133906,
        longitude: 22.166838348056924,
      };

      const R = 20000; // meters

      const randomPoint = randomLocation.randomCirclePoint(P, R);
      user.geometry.coordinates[0] = randomPoint.longitude;
      user.geometry.coordinates[1] = randomPoint.latitude;
      const geo = async () => {
        const data = await geocodingClient
          .reverseGeocode({
            query: [randomPoint.longitude, randomPoint.latitude],
          })
          .send();
        if (
          typeof JSON.parse(data.rawBody).features[0]?.place_name !==
          "undefined"
        ) {
          user.address = JSON.parse(data.rawBody).features[0]?.place_name;
        }
      };

      geo();
    }

    if (i >= 140 && i < 180) {
      const P = {
        latitude: 35.22896478490492,
        longitude: 24.914850216106192,
      };

      const R = 20000; // meters

      const randomPoint = randomLocation.randomCirclePoint(P, R);
      user.geometry.coordinates[0] = randomPoint.longitude;
      user.geometry.coordinates[1] = randomPoint.latitude;
      const geo = async () => {
        const data = await geocodingClient
          .reverseGeocode({
            query: [randomPoint.longitude, randomPoint.latitude],
          })
          .send();
        typeof topic !== "undefined";
        if (
          typeof JSON.parse(data.rawBody).features[0]?.place_name !==
          "undefined"
        ) {
          user.address = JSON.parse(data.rawBody).features[0]?.place_name;
        }
      };

      geo();
    }

    if (i >= 180 && i < 200) {
      const P = {
        latitude: 34.96849186020317,
        longitude: 33.150784392621496,
      };

      const R = 20000; // meters

      const randomPoint = randomLocation.randomCirclePoint(P, R);
      user.geometry.coordinates[0] = randomPoint.longitude;
      user.geometry.coordinates[1] = randomPoint.latitude;
      const geo = async () => {
        const data = await geocodingClient
          .reverseGeocode({
            query: [randomPoint.longitude, randomPoint.latitude],
          })
          .send();
        if (
          typeof JSON.parse(data.rawBody).features[0]?.place_name !==
          "undefined"
        ) {
          user.address = JSON.parse(data.rawBody).features[0]?.place_name;
        }
      };

      geo();
    }

    const newUser = await User.register(user, `pass${i}`);
    course0.members.push(newUser._id);
    course1.members.push(newUser._id);
    course2.members.push(newUser._id);

    await course0.save();
    await course1.save();
    await course2.save();
    console.log(newUser);
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
