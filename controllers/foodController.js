const Category = require("../models/category")
const Food = require("../models/food")
const asyncHandler = require("express-async-handler")

exports.food_list = asyncHandler(async (req, res, next) => {
    const foods = await Food.find().sort({name: 1}).exec()

    res.render("foodView", {
        title: "All food",
        foods: foods,
    })
})

exports.food_detail = asyncHandler(async (req, res, next) => {
    const food = await Food.findById(req.params.id).exec();

    try {
        const categoryIds = food.category;
        const foundCategories = await Category.find({ _id: { $in: categoryIds } });

        console.log(foundCategories)
    
        res.render("foodDetail", {
            title: "Food detail",
            food: food,
            categories: foundCategories,
        })
    } catch (error) {
        console.error("Error in food detail:", error);
        next(error);
    }
})

exports.food_create_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented")
})

exports.food_create_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented")
})

exports.food_delete_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented")
})

exports.food_delete_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented")
})

exports.food_update_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented")
})

exports.food_update_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented")
})