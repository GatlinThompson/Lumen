import mongoose from "mongoose";

const Schema = mongoose.Schema;

let employeeTrainingSchema = new Schema({
  training_program: { type: Schema.Types.ObjectId, ref: "TrainingProgram" },
  enrolled_employee: { type: Schema.Types.ObjectId, ref: "User" },
  enrolled_training_session: {
    type: Schema.Types.ObjectId,
    ref: "TrainingSession",
    default: null,
  },
  enrolled_date: {
    type: Date,
    default: null,
  },
  completion_date: {
    type: Date,
    default: null,
  },
  training_completed: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

//composite primary key for training program and employee
employeeTrainingSchema.index(
  { training_program: 1, enrolled_employee: 1 },
  { unique: true }
);

export let EmployeeTraining = mongoose.model(
  "EmployeeTraining",
  employeeTrainingSchema
);
