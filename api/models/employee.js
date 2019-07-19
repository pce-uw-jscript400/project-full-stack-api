const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    preferred_name: String,
    birthday: String,
    email: {
      type: String,
      required: true
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  }
);

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
