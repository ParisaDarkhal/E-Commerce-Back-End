const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// find all tags and be sure to include its associated Product data
// localhot:3001/tags
router.get("/", async (req, res) => {
  try {
    const dbTagData = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "inStock", "category_id"],
          through: ProductTag,
          as: "product_tags",
        },
      ],
    });

    if (!dbTagData) {
      res.status(404).json({ message: "Tags not found!" });
      return;
    }

    res.json(dbTagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post("/", (req, res) => {
  // create a new tag
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
