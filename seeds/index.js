const mongoose = require("mongoose");
const Course = require("../models/course");
const User = require("../models/user");
const courses = require("./courses");
const users = require("./users");
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

  for (let i = 0; i < users.length; i++) {
    const {
      name,
      surname,
      username,
      password,
      role,
      facebook,
      instagram,
      twitter,
      town,
      address,
      bio,
    } = users[i];
    console.log();
    const user = new User({
      name,
      surname,
      username,
      role,
      facebook,
      instagram,
      twitter,
      town,
      address,
      bio,
    });
    user.skills = users[i].skills;
    const newUser = await User.register(user, password);
    console.log(newUser);
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
