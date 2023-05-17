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

// update a tag's name by its `id` value
// localhost:3001/api/tags/:id
router.put("/:id", async (req, res) => {
  try {
    const [numRowsAffected, dbTagData] = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true, // This ensures that the updated data is returned
    });

    if (numRowsAffected === 0) {
      res.status(404).json({ message: "Tag not found!" });
      return;
    }

    res.json(dbTagData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// delete on tag by its `id` value
// localhost:3001/api/tags/:id
router.delete("/:id", async (req, res) => {
  try {
    const numRowsAffected = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (numRowsAffected === 0) {
      res.status(404).json({ message: "Tag not found!" });
      return;
    }

    res.json({ message: "Tag deleted successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
