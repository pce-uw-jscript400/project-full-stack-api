const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Company = require("./company");

const unitSchema = new Schema(
  {
    kind: {
      seat: String,
      desk: String,
      small_office: String,
      large_office: String,
      floor: Number,
      required: true
    },
    floor: { type: Number, required: true },
    special_monthly_offer: [
      {
        name: {
          type: String,
          required: false
        },
        dob: String
      }
    ],
    company: [Company]
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const Unit = mongoose.model("Unit", unitSchema);

module.exports = Unit;
