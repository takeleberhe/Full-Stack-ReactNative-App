const Category = require("../Model/Category");

/*create API functions here for each route*/
const createCategory = async (req, res, next) => {
  let category;
  try {
    category = await new Category({
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    });
    const createdcategory = await category.save();

    if (!createdcategory) {
      return res.status(404).json({ message: "category can't be created!" });
    } else {
      res.send(createdcategory);
    }
  } catch (error) {
    console.error(error);
  }
};

const getAllCategory = async (req, res, next) => {
  let categoryList;
  try {
    categoryList = await Category.find();
  } catch (err) {
    console.log(err);
  }
  if (!categoryList) {
    return res.status(404).json({ message: "category didn't found" });
  } else {
    return res.status(200).json({ categoryList });
  }
};

const deleteCategory = async (req, res, next) => {
  let category;
  try {
    category = await Category.findByIdAndRemove(req.params.id);
  } catch (error) {
    return res.Categorystatus(404).json({ message: error.message });
  }

  if (!category) {
    res.send({ message: "category didn't found" });
  }
  return res.status(200).json({ message: "category deleted successfully!" });
};

const updateCategory = async (req, res) => {
  let id = req.params.id;
  const { name, icon, color } = req.body;
  let category;
  try {
    category = await Category.findByIdAndUpdate(
      id,
      {
        name,
        icon,
        color,
      },
      {
        new: true,
      }
    );
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
  if (!category) {
    return res.status(404).json({ message: "category didn't found!" });
  }

  return res.status(200).json({ category });
};

module.exports = {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
};
