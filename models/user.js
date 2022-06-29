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

const FileSchema = new Schema({
  path: {
    type: String,
  },
  filename: {
    type: String,
  },
  submitted: {
    type: Date,
    default: Date.now,
  },
  filetype: {
    type: String,
    default: "file",
  },
  visible: {
    type: Boolean,
    default: true,
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

const options = { toJSON: { virtuals: true } };

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    uni: {
      type: String,
    },
    address: {
      type: String,
      default: "Αγίου Δημητρίου, 546 21 Θεσσαλονίκη, Ελλάδα",
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
    assignments: [FileSchema],
    skills: [SkillSchema],
    geometry: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
      },
    },
  },
  options
);

UserSchema.virtual("properties.popUpMarkup").get(function () {
  return `<div class="row">
  <div class="col-6">
    <img
      src="${this.image.url}"
      style="border-radius: 50%; height: 60px"
    />
  </div>
  <div class="col-6">
    <a href="/user/${this._id}">
      ${
        this.name + " " + this.surname
      } (${this.role === "teacher" ? "Καθηγητής" : "Φοιτητής"})</a
    >
  </div>
</div>`;
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
