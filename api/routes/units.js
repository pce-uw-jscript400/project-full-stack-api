const router = require("express").Router();
// const helpers = require("../helpers/helpers");
const Unit = require("../models/unit");

// const publicKeys = "_id kind floor special_monthly_offer company -__v";

// Initial data for setup and testing
// const units = [
//   {
//     id: "j9U3iNIQi",
//     kind: "small office",
//     floor: 10,
//     special_monthly_offer: "$600/mo",
//     company: "Stan's Office Supplies"
//   }
// ];

// WORKING SOLUTION FOR GET ALL UNITS
// router.get("/", async (req, res, next) => {
//   const status = 200;
//   try {
//     const response = await Unit.find();
//     res.json({ status, response });
//   } catch (error) {
//     console.log(error);
//     const e = new Error(
//       "Something went wrong when attempting to get all the units."
//     );
//     e.status = 400;
//     next(e);
//   }
// });

// TEST /////////

// PARTIALLY WORKING SOLUTION FOR ?kind=kind
router.get("/", async (req, res, next) => {
  const status = 200;
  try {
    // const response = await Unit.find();
    // res.json({ status, response });
    const kind = req.query.kind;
    const findUnitKind = await Unit.find({ kind }).getFilter();
    console.log("### -> ", findUnitKind);
    res.json({ status, findUnitKind });
  } catch (error) {
    console.log(error);
    const e = new Error(
      "Something went wrong when attempting to find kind of unit."
    );
    e.status = 400;
    next(e);
  }
});

// TEST /////////

// PARTIALLY WORKING SOLUTION FOR ?floor=integer
// router.get("/", async (req, res, next) => {
//   const status = 200;
//   try {
//     // const response = await Unit.find();
//     // res.json({ status, response });
//     const floor = req.query.floor;
//     const findUnitFloor = await Unit.find({ floor: floor }).getFilter();
//     console.log("### -> ", findUnitFloor);
//     res.json({ status, findUnitFloor });
//   } catch (error) {
//     console.log(error);
//     const e = new Error(
//       "Something went wrong when attempting to find kind of unit."
//     );
//     e.status = 400;
//     next(e);
//   }
// });

// TEST /////////

// router.post("/", async (req, res, next) => {
//   const status = 201;
//   try {
//     res.json({ status, response });
//   } catch (error) {
//     console.log(error);
//     const e = new Error("Something went wrong.");
//     e.status = 400;
//     next(e);
//   }
// });

router.post("/", async (req, res, next) => {
  const status = 201;
  try {
    const response = await Unit.create(req.body);
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
