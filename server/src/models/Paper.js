import mongoose from "mongoose";

const paperSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    firstAuthor: {
      type: String,
      required: true,
      trim: true,
    },

    researchDomain: {
      type: String,
      required: true,
      enum: [
        "Computer Science",
        "Biology",
        "Physics",
        "Chemistry",
        "Mathematics",
        "Social Sciences",
      ],
    },

    readingStage: {
      type: String,
      required: true,
      enum: [
        "Abstract Read",
        "Introduction Done",
        "Methodology Done",
        "Results Analyzed",
        "Fully Read",
        "Notes Completed",
      ],
    },

    citationCount: {
      type: Number,
      default: 0,
    },

    impactScore: {
      type: String,
      enum: [
        "High Impact",
        "Medium Impact",
        "Low Impact",
        "Unknown",
      ],
      default: "Unknown",
    },

    dateAdded: {
      type: Date,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Paper", paperSchema);