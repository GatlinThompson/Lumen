import mongoose from "mongoose";

const Schema = mongoose.Schema;

let departmentSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

export let Department = mongoose.model("Department", departmentSchema);
