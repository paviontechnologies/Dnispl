const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    fullDescription: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      default: "#apply",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);