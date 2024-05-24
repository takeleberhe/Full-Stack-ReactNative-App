const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  compnay: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
  },
  githubusername: {
    type: String,
    default: "",
  },
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      compnay: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
        default: "",
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
    },
  ],
  socials: [
    {
      facebook: {
        type: String,
      },
      youtube: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      instagram: {
        type: String,
      },
      x: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

profileSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

profileSchema.set("toJSON", {
  virtuals: true,
});

module.exports = mongoose.model("Profile", profileSchema);
