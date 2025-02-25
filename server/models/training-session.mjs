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

// Training Session Methods

// set end time
trainingSessionSchema.methods.SetEndTime = async function (startTime, program) {
  try {
    // get training program
    const traingProgram = await TrainingProgram.findById(program);

    // check if training program exists
    if (traingProgram) {
      //set end time for session
      this.end_time = new Date(
        this.startTime.getTime() + traingProgram.duration * 60 * 1000
      );
    }
  } catch (err) {
    console.log(err);
  }
};

export let TrainingSession = mongoose.model(
  "TrainingSession",
  trainingSessionSchema
);
