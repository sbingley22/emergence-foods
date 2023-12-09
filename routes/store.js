var express = require('express');
var router = express.Router();

const category_controller = require("../controllers/categoryController")
const food_controller = require("../controllers/foodController")

//Category Routes

router.get("/", category_controller.index)

router.get("/category/create", category_controller.category_create_get)

router.post("/category/create", category_controller.category_create_post)

router.get("/category/:id/delete", category_controller.category_delete_get)

router.post("/category/:id/delete", category_controller.category_delete_post)

router.get("/category/:id/update", category_controller.category_update_get)

router.post("/category/:id/update", category_controller.category_update_post)

router.get("/category/:id", category_controller.category_detail)

router.get("/categories", category_controller.category_list)


//Food Routes

router.get("/food/create", food_controller.food_create_get)

router.post("/food/create", food_controller.food_create_post)

router.get("/food/:id/delete", food_controller.food_delete_get)

router.post("/food/:id/delete", food_controller.food_delete_post)

router.get("/food/:id/update", food_controller.food_update_get)

router.post("/food/:id/update", food_controller.food_update_post)

router.get("/food/:id", food_controller.food_detail)

router.get("/foods", food_controller.food_list)


module.exports = router;