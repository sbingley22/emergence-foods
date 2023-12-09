const Category = require("../models/category")
const Food = require("../models/food")

const asyncHandler = require("express-async-handler")

exports.index = asyncHandler(async (req, res, next) => {
    // Get details of foods and category counts (in parallel)
    const [
      numFoods,
      numCategories,
    ] = await Promise.all([
      Food.countDocuments({}).exec(),
      Category.countDocuments({}).exec(),
    ]);
  
    res.render("index", {
      title: "Emergence Foods Home",
      food_count: numFoods,
      category_count: numCategories,
    });
  });

exports.category_list = asyncHandler(async (req, res, next) => {
    res.send("Not implemented")
})

exports.category_detail = asyncHandler(async (req, res, next) => {
    res.send(`Not implemented: Detail ${req.params.id}`)
})

exports.category_create_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented")
})

exports.category_create_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented")
})

exports.category_delete_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented")
})

exports.category_delete_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented")
})

exports.category_update_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented")
})

exports.category_update_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented")
})