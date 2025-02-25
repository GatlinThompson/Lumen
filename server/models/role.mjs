import mongoose from "mongoose";

const Schema = mongoose.Schema;

let roleSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});

export let Role = mongoose.model("Role", roleSchema);
