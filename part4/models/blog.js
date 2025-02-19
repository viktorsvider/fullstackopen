const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 1,
    required: true,
  },
  author: String,
  url: {
    type: String,
    minLength: 5,
    required: true,
  },
  likes: Number,
  user: {
    required: true,
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
