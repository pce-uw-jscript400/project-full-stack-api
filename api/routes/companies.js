const router = require("express").Router();
const Unit = require("../models/unit");

router.get("/", async (req, res, next) => {
  const status = 200;
  const query = req.query.name;
  try {
    const companies = await Unit.find(query);
    // companies = companies.filter(company => company.name === query);
    res.json({ status, companies });
  } catch (error) {
    console.log(error);
    const e = new Error(
      "Something went wrong when attempting to get all the companies."
    );
    e.status = 400;
    next(e);
  }
});

// router.post("/", async (req, res, next) => {
//   const status = 201;
//   try {
//     const response = await Company.create(req.body);
//     res.json({ status, response });
//   } catch (error) {
//     console.log(error);
//     const e = new Error(
//       "Something went wrong when attempting to post the company."
//     );
//     e.status = 400;
//     next(e);
//   }
// });

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
