const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  answer: {
    type: String,
  },
});

const RequestSchema = new mongoose.Schema(
  {
    pet_id: {
      type: String,
    },
    pet_name: {
      type: String,
    },
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
    status: {
      type: String,
    },
    seen: {
      type: Boolean,
      default: false,
    },
    questionnaire: [QuestionSchema],
  },
  { timestamps: true }
);

const CarerSchema = new mongoose.Schema({
  requests: [RequestSchema],
});

module.exports = CarerSchema;
