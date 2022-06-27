const mongoose = require("mongoose");
const Course = require("../models/course");
const User = require("../models/user");
const courses = require("./courses");
const axios = require("axios");
const randomName = require("node-random-name");

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

  for (let i = 0; i < 50; i++) {
    const user = new User({
      name: randomName({ first: true, random: Math.random }),
      surname: randomName({ last: true, random: Math.random }),
      username: `user${i}@user${i}`,
      bio: "Ονομάζομαι Τριαντάφυλλος Ηλιάδης, είμαι φοιτητής στην πληροφορική σχολή του Αριστοτελείου πανεπιστημίου Θεσσαλονίκης και κατάγομαι από τη Δράμα. Στον ελεύθερο μου χρόνο ασχολούμαι με τη γυμναστική, το web development και το gaming. Ενδιαφέρομαι ιδιαίτερα για web development και είναι κάτι με το οποίο θα ήθελα να ασχοληθώ επαγγελματικά μελλοντικά. Αυτή η πτυχιακή εργασία έγινε με τις τελευταίες τεχνολογίες (js, node, express) που συχνά ζητά η αγορά εργασίας στον τομέα του web developemt και δόθηκε έμφαση στο οπτικό κομμάτι αλλά και στις δυνατότητες επεξεργασίας προφίλ του χρήστη (Journaling).",
    });
    if (i == 0) user.role = "teacher";
    else user.role = "student";

    user.facebook = "Τριαντάφυλλος Ηλιάδης";
    user.instagram = "Triantafyllos Iliadis";
    user.twitter = "daxakaTI";
    user.skills = [
      {
        skillName: "Frontend development",
        rating: 70,
      },
      {
        skillName: "Database design",
        rating: 50,
      },
      {
        skillName: "Backend development",
        rating: 80,
      },
      {
        skillName: "Security",
        rating: 40,
      },
    ];

    user.assignments = [
      {
        path: "fileStorage/1656319083763 - 3145765.png",
        filename: "1656319083763 - 3145765",
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

    const newUser = await User.register(user, `pass${i}`);
    console.log(newUser);
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
