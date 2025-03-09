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

export let TrainingSession = mongoose.model(
  "TrainingSession",
  trainingSessionSchema
);
