const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const employeeSchema = require("./employee");

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
    employees: [employeeSchema]
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

// const Company = mongoose.model("Company", companySchema);

module.exports = companySchema;
