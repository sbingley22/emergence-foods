const Category = require("../models/category")
const Food = require("../models/food")
const { body, validationResult  } = require("express-validator");

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
    const categories = await Category.find().exec()

    res.render("foodForm", {
        title: "New food",
        food: undefined,
        categories: categories,
        errors: [],
    })
})

exports.food_create_post = [
    body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified."),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        console.log(req.body.categories)

        const food = new Food({
            name: req.body.name,
            items_left: req.body.items_left,
            sell_by_date: req.body.sell_by_date,
            category: req.body.categories,
        })

        if (!errors.isEmpty()) {
            //Errors in form, rerender with sanitized values.
            console.log("Errors in form")
            const categories = await Category.find().exec()

            res.render("foodForm", {
                title: "New food",
                food: food,
                categories: categories,
                errors: errors.array(),
            })
            return
        } else {
            //Save category to database
            console.log("Saving new food to Database")
            await food.save();
            res.redirect(food.url)
        }
    })
]

exports.food_delete_get = asyncHandler(async (req, res, next) => {
    const food = await Food.findById(req.params.id).exec()

    res.render("foodDelete", {
        title: "Delete Food",
        food: food,
    })
})

exports.food_delete_post = asyncHandler(async (req, res, next) => {
    const food = await Food.findById(req.params.id).exec()

    console.log("Deleting food")
    await Food.findByIdAndDelete(req.body.foodid);
    res.redirect("/store")
})

exports.food_update_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented")
})

exports.food_update_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented")
})