import mongoose from "mongoose";
import crypto from "crypto";

const Schema = mongoose.Schema;

let userSchema = new Schema({
  first_name: {
    type: String,
    trim: true,
    unique: false,
    required: true,
  },
  last_name: {
    type: String,
    trim: true,
    default: null,
  },
  email: { type: String, unique: true, trim: true, required: true },
  deparment: { type: Schema.Types.ObjectId, ref: "Department" },
  role: { type: Schema.Types.ObjectId, ref: "Role" },
  hash: String,
  salt: String,
  is_active: {
    type: Boolean,
    default: true,
  },
  background_color: {
    type: String,
    default: "#FFF",
  },
});

// User methods

//create password hash
userSchema.methods.createPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 128, "sha512")
    .toString("hex");
};

//Check if enter password is valid
userSchema.methods.isPasswordValid = function (password) {
  let passwordAttempt = crypto
    .pbkdf2Sync(password, this.salt, 1000, 128, "sha512")
    .toString("hex"); //hash attempted password

  return this.hash === passwordAttempt; //return true/false
};

//sets users unique cool pastel background color
userSchema.methods.generateBackgroundColor = async function () {
  let uniqueColor = false; //set unique color false

  //loop til user has unique color
  while (!uniqueColor) {
    try {
      const randomColor = getRandomCoolColor();

      //check if color is already being used
      const colorUsed = await User.findOne({ background_color: randomColor });

      // check is color exist in users
      if (!colorUsed) {
        this.background_color = randomColor; //set background color to random color
        uniqueColor = true; //set unique color to true, escape loop
      }
    } catch (err) {
      console.log(err);
      break; //break loop
    }
  }
};

// Creates random cool pastel color
const getRandomCoolColor = () => {
  // random hue number based between 180 and 270 for cooler colors
  const hue = Math.floor(Math.random() * (270 - 180 + 1)) + 180;

  return `hsl(${hue}, 100%, 90%)`; //returns hsl color string
};

export let User = mongoose.model("User", userSchema);
