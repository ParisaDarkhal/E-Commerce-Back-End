const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

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

// find one category by its `id` value
// be sure to include its associated Products
router.get("/:id", async (req, res) => {
  try {
    const dbCategoryData = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "inStock"],
        },
      ],
    });

    if (!dbCategoryData) {
      res.status(404).json({ message: "User not found!" });
    } else {
      res.json(dbCategoryData);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
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
