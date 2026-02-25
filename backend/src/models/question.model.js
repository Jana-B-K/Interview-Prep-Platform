import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    link: {
      type: String,
      required: true,
      trim:true,
    },
    category: {
      type: String,
      required: true,
      enum: ["dsa", "sql"],
    },

    difficulty: {
      type: String,
      required: true,
      enum: ["easy", "medium", "hard"],
    },

    sampleInputOutput: {
      type: String,
      required: true,
      trim: true,
    },

    constraints: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;