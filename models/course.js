const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

const FileSchema = new Schema({
  url: String,
  filename: String,
  filetype: String,
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
  files: [FileSchema],
  images: ImageSchema,
  created: {
    type: Date,
    default: Date.now,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Course", courseSchema);
