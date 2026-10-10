const mongoose = require("mongoose");

const examAttemptSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
    },

    answers: [
      {
        questionIndex: Number,
        selectedOption: Number,
      },
    ],

    score: {
      type: Number,
      default: 0,
    },

    isSubmitted: {
      type: Boolean,
      default: false,
    },

    submittedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ExamAttempt", examAttemptSchema);
