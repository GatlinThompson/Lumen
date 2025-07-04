import mongoose from "mongoose";

const Schema = mongoose.Schema;

let trainingProgramSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  assigned_manager: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  archived: {
    type: Boolean,
    default: false,
  },
  training_sessions: [
    {
      type: Schema.Types.ObjectId,
      ref: "TrainingSession",
    },
  ],
  background_color: {
    type: String,
    default: "#FFF",
  },
  max_occupancy: Number,
  created_at: {
    type: Date,
    default: Date.now,
  },
  modified_at: {
    type: Date,
    default: null,
  },
});

// Training Program Pre Middleware
trainingProgramSchema.pre("save", async function (next) {
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
      const colorUsed = await TrainingProgram.findOne({
        background_color: randomColor,
      });

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
  // random hue number based between 100 and 270 for cooler colors
  const hue = Math.floor(Math.random() * (270 - 100 + 1)) + 100;

  return `hsl(${hue}, 100%, 90%)`; //returns hsl color string
};

export let TrainingProgram = mongoose.model(
  "TrainingProgram",
  trainingProgramSchema
);
