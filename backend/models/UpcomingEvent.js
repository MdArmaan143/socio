const mongoose = require("mongoose");

const UpcomingEventSchema = new mongoose.Schema({
  societyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Society",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UpcomingEvent = mongoose.model("UpcomingEvent", UpcomingEventSchema);

module.exports = UpcomingEvent;
