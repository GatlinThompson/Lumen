import mongoose from "mongoose";

const Schema = mongoose.Schema;

let notificationSchema = new Schema({
  recipents: [{ type: Schema.Types.ObjectId, ref: "User" }],
  description: { type: String, required: true },
  created_at: {
    type: Date,
    default: Date.now,
  },
  viewed: {
    type: Boolean,
    default: false,
  },
  notification_link: {
    type: String,
  },
});

export let Notification = mongoose.model("Notification", notificationSchema);
