const router = require("express").Router();
// const helpers = require("../helpers/helpers");
const Employee = require("../models/employee");

// const publicKeys = "";

// Initial data for setup and testing
// const employee = [
//   {
//     id: "afdajkljeuio",
//     first_name: "Vincent Edward",
//     last_name: "Jackson"
//     preferred_name: "Bo",
//     birthday: "11-30-1962",
//     email: "bo@boknows.com"
//   }
// ];

router.get("/", async (req, res, next) => {
  const status = 200;
  const response = await Employee.find();

  res.json({ status, response });
});

router.post("/", async (req, res, next) => {
  const status = 201;
  try {
    const response = await Employee.create(req.body);
    res.json({ status, response });
  } catch (error) {
    console.log(error);
    const e = new Error(
      "Something went wrong when attempting to post the employee."
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
