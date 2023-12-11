const Category = require("../models/category")
const Food = require("../models/food")
const { body, validationResult  } = require("express-validator");

const asyncHandler = require("express-async-handler")

exports.index = asyncHandler(async (req, res, next) => {
    // Get details of foods and category counts
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
    const categories = await Category.find().sort({name: 1}).exec()

    res.render("categoryView", {
        title: "All Categories",
        categories: categories,
    })
})

exports.category_detail = asyncHandler(async (req, res, next) => {
    const [category, foods] = await Promise.all([
        Category.findById(req.params.id).exec(), 
        Food.find({category: req.params.id}).sort({name: 1}).exec()
    ]);

    res.render("categoryDetail", {
        title: "Category",
        category: category,
        foods: foods,
    })
})

exports.category_create_get = asyncHandler(async (req, res, next) => {
    res.render("categoryForm", {
        title: "New category",
        category: undefined,
        errors: [],
    })
})

exports.category_create_post = [
    body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must be specified."),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const category = new Category({
            name: req.body.name,
        })

        if (!errors.isEmpty()) {
            //Errors in form, rerender with sanitized values.
            console.log("Errors in form")
            res.render("categoryForm", {
                title: "New category",
                category: category,
                errors: errors.array(),
            })
            return
        } else {
            //Save category to database
            console.log("Saving new category to Database")
            await category.save();
            res.redirect(category.url)
        }
    })
]

exports.category_delete_get = asyncHandler(async (req, res, next) => {
    const[category, allFoods] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Food.find({category: req.params.id}).sort({name: 1}).exec()
    ])

    res.render("categoryDelete", {
        title: "Delete Category",
        category: category,
        foods: allFoods,
    })
})

exports.category_delete_post = asyncHandler(async (req, res, next) => {
    const[category, allFoods] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Food.find({category: req.params.id}).sort({name: 1}).exec()
    ])

    if (allFoods.length != 0){
        console.log("Delete foods first!!!")
        res.render("categoryDelete", {
            title: "Delete Category",
            category: category,
            foods: allFoods,
        })
    } else {
        console.log("Deleting category")
        await Category.findByIdAndDelete(req.body.categoryid);
        res.redirect("/store")
    }
})

exports.category_update_get = asyncHandler(async (req, res, next) => {
    res.send("Not implemented")
})

exports.category_update_post = asyncHandler(async (req, res, next) => {
    res.send("Not implemented")
})