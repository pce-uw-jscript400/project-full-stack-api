const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Company = require("./company");

const unitSchema = new Schema(
  {
    kind: {
      type: String,
      enum: [
        "seat",
        "desk",
        "small_office",
        "large_office",
        "floor",
        "required"
      ],
      required: true
    },
    floor: { type: Number, required: true },
    special_monthly_offer: { type: Number, min: 0, max: 1000000 },
    company: [Company]
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const Unit = mongoose.model("Unit", unitSchema);

module.exports = Unit;
