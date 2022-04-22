//Seed DB
const mongoose = require("mongoose");
const Course = require("../models/course");
const courses = require("./courses");
const axios = require("axios");

mongoose.connect("mongodb://localhost:27017/thesis", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
  await Course.deleteMany({});
  for (let i = 0; i < 25; i++) {
    //get random images from
    const img = await axios.get(
      "https://api.unsplash.com/photos/random/?client_id=5oyzn1pALQH16hRegJFZsFnTV8Ov9LqrYGnm5NYYPhI&collections=402504"
    );
    console.log(img);
    const course = new Course({
      title: courses[i].title,
      description: courses[i].description,
      images: [
        {
          url: img.data.urls.regular,
        },
      ],
    });
    await course.save();
    console.log(course);
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
