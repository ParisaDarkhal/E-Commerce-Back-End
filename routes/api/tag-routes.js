const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// find all tags and be sure to include its associated Product data
// localhot:3001/api/tags
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

// find a single tag by its `id` and be sure to include its associated Product data
// localhot:3001/api/tags/:id
router.get("/:id", async (req, res) => {
  try {
    const dbTagData = await Tag.findOne({
      where: {
        id: req.params.id,
      },
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
      res.status(404).json({ message: "Tag not found!" });
      return;
    }

    res.json(dbTagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// create a new tag
// localhost:3001/api/tags
router.post("/", async (req, res) => {
  try {
    const dbTagData = await Tag.create({
      tag_name: req.body.tag_name,
    });

    res.json(dbTagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
