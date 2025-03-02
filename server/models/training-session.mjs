import mongoose from "mongoose";
import { TrainingProgram } from "./training-program.mjs";

const Schema = mongoose.Schema;

let trainingSessionSchema = new Schema({
  training_program: {
    type: Schema.Types.ObjectId,
    ref: "TrainingProgram",
  },
  trainer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
  },
});

// Training Pre Middleware

// set end time
trainingSessionSchema.pre("save", function (next) {
  try {
    //check if this these to fields exist and not null
    if (this.start_time || this.training_program.duration) {
      //set end time for session
      this.end_time = new Date(
        this.start_time.getTime() + this.training_program.duration * 60 * 1000
      );
      return next(); //return next and end function
    } else {
      throw new Error("Start Time and/or Training Program doesn't not exist.");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export let TrainingSession = mongoose.model(
  "TrainingSession",
  trainingSessionSchema
);
