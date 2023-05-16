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

// create a new category
router.post("/", async (req, res) => {
  try {
    const dbCategoryData = await Category.create({
      category_name: req.body.category_name,
    });

    res.json(dbCategoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// update a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const [rowsAffected, dbCategoryData] = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true, // This ensures that the updated category is returned
    });

    if (rowsAffected === 0) {
      res.status(404).json({ message: "Category not found!" });
    } else {
      res.status(200).json(dbCategoryData[0]); // Access the first element of the returned array
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const dbProductData = await Product.destroy({
      where: {
        category_id: req.params.id,
      },
    });

    if (!dbProductData) {
      res.status(404).json({ message: "Product not found!" });
      return;
    }

    const dbCategoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!dbCategoryData) {
      res.status(404).json({ message: "Category not found!" });
      return;
    }

    res.json(dbCategoryData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
