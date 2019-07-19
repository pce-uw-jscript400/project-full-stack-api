const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    contact_email: {
      type: String,
      required: true
    },
    employees: Object // NOT 100% come back to this
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
