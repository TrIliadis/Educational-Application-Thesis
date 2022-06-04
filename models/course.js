const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const ImageSchema = new Schema({
  url: String,
  filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_200");
});

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  teachers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  description: {
    type: String,
    required: true,
  },
  files: [String],
  images: ImageSchema,
  created: Date,
  lastActive: Date,
});

module.exports = mongoose.model("Course", courseSchema);
