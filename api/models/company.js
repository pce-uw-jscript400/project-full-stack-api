const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Employee = require("./employee").schema;

const companySchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    name: {
      type: String,
      required: true
    },
    contact_email: {
      type: String,
      required: true
    },
    // employees: [Employee]
    employees: [{ type: Schema.Types.ObjectId, ref: "Employee" }] // NOT 100% ON THIS
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
