const mongoose = require("mongoose");
const Course = require("../models/course");
const User = require("../models/user");
const courses = require("./courses");
const axios = require("axios");
const randomName = require("node-random-name");
const randomLocation = require("random-location");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocodingClient = mbxGeocoding({
  accessToken:
    "pk.eyJ1IjoiZGF4YWthIiwiYSI6ImNsMXhicW1odTAxYWgzZG1tODVtcjRnYmQifQ.p0DZDL3qMIzWsdHrRxgj4Q",
});

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

//Dummy seed DB
const seedDB = async () => {
  //delete course and user collection data
  await Course.deleteMany({});
  await User.deleteMany({});

  for (let i = 0; i < 5; i++) {
    //get random images from unsplash api
    const img = await axios.get(
      "https://api.unsplash.com/photos/random/?client_id=5oyzn1pALQH16hRegJFZsFnTV8Ov9LqrYGnm5NYYPhI&collections=907185"
    );
    const course = new Course({
      title: courses[i].title,
      description: courses[i].description,
      created: randomDate(new Date(1991, 22, 08), new Date()),
      lastActive: new Date().toLocaleDateString(),
      images: {
        url: img.data.urls.raw + "&w=1500&dpr=2&h=758",
      },
    });
    await course.save();
    console.log(course);
  }

  for (let i = 0; i < 200; i++) {
    const user = new User({
      name: randomName({ first: true, random: Math.random }),
      surname: randomName({ last: true, random: Math.random }),
      username: `user${i}@user${i}`,
      bio: "Ονομάζομαι Τριαντάφυλλος Ηλιάδης, είμαι φοιτητής στην πληροφορική σχολή του Αριστοτελείου πανεπιστημίου Θεσσαλονίκης και κατάγομαι από τη Δράμα. Στον ελεύθερο μου χρόνο ασχολούμαι με τη γυμναστική, το web development και το gaming. Ενδιαφέρομαι ιδιαίτερα για web development και είναι κάτι με το οποίο θα ήθελα να ασχοληθώ επαγγελματικά μελλοντικά. Αυτή η πτυχιακή εργασία έγινε με τις τελευταίες τεχνολογίες (js, node, express) που συχνά ζητά η αγορά εργασίας στον τομέα του web developemt και δόθηκε έμφαση στο οπτικό κομμάτι αλλά και στις δυνατότητες επεξεργασίας προφίλ του χρήστη (Journaling).",
      uni: "CSD, AUTH",
    });
    if (i % 10 == 0) user.role = "teacher";
    else user.role = "student";

    const j = Math.floor(Math.random() * 200);
    if (j < 20) {
      user.image.url =
        "https://res.cloudinary.com/dgzlym20q/image/upload/v1656496172/makeItGreen/photo-1619895862022-09114b41f16f_pz0oeg.jpg";
      user.image.filename = "photo-1619895862022-09114b41f16f_pz0oeg.jpg";
    } else if (j < 40) {
      user.image.url =
        "https://res.cloudinary.com/dgzlym20q/image/upload/v1656496187/makeItGreen/photo-1438761681033-6461ffad8d80_p4x06p.jpg";
      user.image.filename = "photo-1438761681033-6461ffad8d80_p4x06p.jpg";
    } else if (j < 60) {
      user.image.url =
        "https://res.cloudinary.com/dgzlym20q/image/upload/v1656496202/makeItGreen/photo-1463453091185-61582044d556_xj5dix.jpg";
      user.image.filename = "photo-1463453091185-61582044d556_xj5dix.jpg";
    } else if (j < 80) {
      user.image.url =
        "https://res.cloudinary.com/dgzlym20q/image/upload/v1656496216/makeItGreen/photo-1518020382113-a7e8fc38eac9_ro5vyf.jpg";
      user.image.filename = "photo-1518020382113-a7e8fc38eac9_ro5vyf.jpg";
    } else if (j < 100) {
      user.image.url =
        "https://res.cloudinary.com/dgzlym20q/image/upload/v1656496231/makeItGreen/photo-1505628346881-b72b27e84530_xodwgw.jpg";
      user.image.filename = "photo-1505628346881-b72b27e84530_xodwgw.jpg";
    } else if (j < 120) {
      user.image.url =
        "https://res.cloudinary.com/dgzlym20q/image/upload/v1656496242/makeItGreen/photo-1624561172888-ac93c696e10c_fif9vd.jpg";
      user.image.filename = "photo-1624561172888-ac93c696e10c_fif9vd.jpg";
    } else if (j < 140) {
      user.image.url =
        "https://res.cloudinary.com/dgzlym20q/image/upload/v1656496252/makeItGreen/photo-1628157588553-5eeea00af15c_j9wyqo.jpg";
      user.image.filename = "photo-1628157588553-5eeea00af15c_j9wyqo.jpg";
    } else if (j < 160) {
      user.image.url =
        "https://res.cloudinary.com/dgzlym20q/image/upload/v1656496264/makeItGreen/photo-1584999734482-0361aecad844_t7pdgb.jpg";
      user.image.filename = "photo-1584999734482-0361aecad844_t7pdgb.jpg";
    } else if (j < 180) {
      user.image.url =
        "https://res.cloudinary.com/dgzlym20q/image/upload/v1656496292/makeItGreen/photo-1489424731084-a5d8b219a5bb_zab4eo.jpg";
      user.image.filename = "photo-1489424731084-a5d8b219a5bb_zab4eo.jpg";
    } else {
      user.image.url =
        "https://res.cloudinary.com/dgzlym20q/image/upload/v1656496312/makeItGreen/photo-1528763380143-65b3ac89a3ff_uctfcv.jpg";
      user.image.filename = "photo-1528763380143-65b3ac89a3ff_uctfcv.jpg";
    }

    user.facebook = `${user.name + " " + user.surname}`;
    user.instagram = `@${user.name}`;
    user.twitter = `@${user.surname}`;
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
        path: "fileStorage/1656319083763 - 3145765.png",
        filename: "1656319083763 - 3145765.png",
        filetype: "png",
        submitted: randomDate(new Date(1991, 22, 08), new Date()),
      },
      {
        path: "fileStorage/1656227934359 - testAssignment.docx",
        filename: "1656227934359 - testAssignment.docx",
        filetype: "docx",
        submitted: randomDate(new Date(1991, 22, 08), new Date()),
      },
      {
        path: "fileStorage/1656227939378 - testAssignment.pptx",
        filename: "1656227939378 - testAssignment.pptx",
        filetype: "pptx",
        visible: false,
        submitted: randomDate(new Date(1991, 22, 08), new Date()),
      },
      {
        path: "fileStorage/1656181046812 - user submissions moodle.txt",
        filename: "1656181046812 - user submissions moodle.txt",
        filetype: "txt",
        visible: false,
        submitted: randomDate(new Date(1991, 22, 08), new Date()),
      },
      {
        path: "fileStorage/1656268287169 - kanonismos_eponisis_ptyhiakis_ergasias_tmimatos_k.e._8-4-2016.pdf",
        filename:
          "1656268287169 - kanonismos_eponisis_ptyhiakis_ergasias_tmimatos_k.e._8-4-2016.pdf",
        filetype: "pdf",
        visible: true,
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

    if (typeof newUser.address == "undefined") {
      newUser.address = "Αγίου Δημητρίου, 546 21 Θεσσαλονίκη, Ελλάδα";
      newUser.save();
    }
    console.log(newUser);
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
