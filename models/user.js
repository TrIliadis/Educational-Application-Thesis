const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const ImageSchema = new Schema({
  url: {
    type: String,
    default:
      "https://res.cloudinary.com/dgzlym20q/image/upload/v1654529943/makeItGreen/avatar7_zzez7a.png",
  },
  filename: {
    type: String,
    default: "avatar",
  },
});

const SkillSchema = new Schema({
  skillName: {
    type: String,
  },
  rating: {
    type: Number,
  },
});

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  town: {
    type: String,
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    enum: ["teacher", "student"],
    default: "student",
    required: true,
  },
  image: {
    type: ImageSchema,
    default: {
      url: "https://res.cloudinary.com/dgzlym20q/image/upload/v1654529943/makeItGreen/avatar7_zzez7a.png",
      filename: "avatar",
    },
  },
  facebook: {
    type: String,
  },
  instagram: {
    type: String,
  },
  twitter: {
    type: String,
  },
  bio: {
    type: String,
  },
  courses: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  // assignments: [FileSchema],
  skills: [SkillSchema],
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
