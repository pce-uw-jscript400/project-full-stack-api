const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Employee = require("./employee");

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
    employees: [Employee]
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

// const Company = mongoose.model("Company", companySchema);

module.exports = companySchema;
