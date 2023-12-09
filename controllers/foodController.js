const Food = require("../models/food")
const asyncHandler = require("express-async-handler")

exports.food_list = asyncHandler(async (req, res, next) => {
    res.send("Not implemented")
})

exports.food_detail = asyncHandler(async (req, res, next) => {
    res.send(`Not implemented: Detail ${req.params.id}`)
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