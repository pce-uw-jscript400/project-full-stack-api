const router = require("express").Router();
// const helpers = require("../helpers/helpers");
const Company = require("../models/company");
const Employee = require("../models/employee").schema;

// const publicKeys = "";

// Initial data for setup and testing
// const employee = [
//   {
//     id: "afdajkljeuio",
//     name: "Bo Knows",
//     contact_email: "boknows@example.com"
//     employees: {},
//   }
// ];

router.get("/", async (req, res, next) => {
  const status = 200;
  const response = await Company.find();

  res.json({ status, response });
});

router.post("/", async (req, res, next) => {
  const status = 201;
  try {
    const response = await Company.create(req.body).populate("Employee");
    res.json({ status, response });
  } catch (error) {
    console.log(error);
    const e = new Error(
      "Something went wrong when attempting to post the company."
    );
    e.status = 400;
    next(e);
  }
});

// router.get("/:id", async (req, res, next) => {
//   const status = 200;
//   const response = await res.json({ status, response });
// });

// router.put("/:id", async (req, res, next) => {
//   const status = 200;
//   const query = { _id: req.params.id };
//   const options = { new: true };
//   const response = await res.json({ status, response });
// });

// router.delete("/:id", async (req, res, next) => {
//   const status = 200;
//   const response = await res.json({ status, response });
// });

module.exports = router;
