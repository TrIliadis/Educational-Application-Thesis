const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const User = require("./user");

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: ImageSchema,
  created: {
    type: Date,
    default: Date.now,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Course", courseSchema);
