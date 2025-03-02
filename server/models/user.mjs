import mongoose from "mongoose";
import crypto from "crypto";
import jwt from "jsonwebtoken";

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
  deparment: { type: Schema.Types.ObjectId, ref: "Department", default: null },
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

// generate jwt for user
userSchema.methods.generateJWT = function () {
  let expirationDate = new Date(); // get date

  //give user 7 day access before cookie expires
  expirationDate.setDate(expirationDate.getDate() + 7);

  //return jwt back
  return jwt.sign(
    {
      _id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      role: this.role,
      deparment: this.deparment,
      background_color: this.background_color,
      expirationDate: parseInt(expirationDate.getTime() / 1000),
    },
    "TEST"
  );
};

// User Pre Middleware

//sets users unique cool pastel background color
userSchema.pre("save", async function (next) {
  //dont preform method is document isnt new
  if (!this.isNew) {
    return next();
  }
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
        return next(); // exit loop and middleware
      }
    } catch (err) {
      console.log(err);
      next(err);
      break; //break loop
    }
  }
});

// Creates random cool pastel color
const getRandomCoolColor = () => {
  // random hue number based between 180 and 270 for cooler colors
  const hue = Math.floor(Math.random() * (270 - 180 + 1)) + 180;

  return `hsl(${hue}, 100%, 90%)`; //returns hsl color string
};

export let User = mongoose.model("User", userSchema);
