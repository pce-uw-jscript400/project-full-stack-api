const router = require("express").Router();
const { generate: generateId } = require("shortid");
// const Unit = require("../models/unit");

// const publicKeys = "";

// Initial data for setup and testing
const unit = [
  {
    id: "j9U3iNIQi",
    kind: "small office",
    floor: 10,
    special_monthly_offer: "$600/mo",
    company: "Stan's Office Supplies"
  }
];

router.get("/", (req, res, next) => {
  const status = 200;
  const response = unit.find().select(publicKeys);

  res.json({ status, response });
});

router.post("/", async (req, res, next) => {
  const status = 201;
  try {
    res.json({ status, response });
  } catch (error) {
    console.log(error);
    const e = new Error("Something went wrong.");
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
