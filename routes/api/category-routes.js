const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// router
//   .get("/", (req, res) => {
//     // find all categories
//     // be sure to include its associated Products
//     Category.findAll({
//       include: [
//         {
//           model: Product,
//           attributes: ["id", "product_name", "price", "inStock"],
//         },
//       ],
//     });
//   })
//   .then((dbCategoryData) => {
//     if (!dbCategoryData) {
//       res.status(400).json({
//         message: "Category not found!",
//       });
//     } else {
//       res.send(dbCategoryData);
//     }
//   })
//   .catch((err) => {
//     console.log(err);
//     res.status(500).json(err);
//   });

router.get("/", async (req, res) => {
  try {
    const dbCategoryData = await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "inStock"],
        },
      ],
    });

    if (!dbCategoryData) {
      res.status(400).json({
        message: "Category not found!",
      });
    } else {
      res.send(dbCategoryData);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", (req, res) => {
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
