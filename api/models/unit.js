const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Company = require("./company").schema;

const unitSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
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
    // company: [{ type: Schema.Types.ObjectId, ref: "Company" }] // NOT 100% ON THIS
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

// Validate properties before save???
unitSchema.set("validateBeforeSave", true);

const Unit = mongoose.model("Unit", unitSchema);

module.exports = Unit;
