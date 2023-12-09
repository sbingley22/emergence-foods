#! /usr/bin/env node

console.log(
  'This script populates some test foods and categories to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Food = require("./models/food");
const Category = require("./models/category");

const foods = [];
const categories = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createFoods();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// category[0] will always be the Keto category, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name) {
  const category = new Category({ name: name });
  await category.save();
  categories[index] = category;
  console.log(`Added category: ${name}`);
}

async function foodCreate(index, name, items_left, sell_by_date, category) {
  const fooddetail = {
    name: name,
    items_left: items_left,
    sell_by_date: sell_by_date,
    category: category,
  };
  if (category != false) fooddetail.name = name;

  const food = new Food(fooddetail);
  await food.save();
  foods[index] = food;
  console.log(`Added food: ${name}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, "Keto"),
    categoryCreate(1, "Carbosis"),
    categoryCreate(2, "Low BCAA"),
  ]);
}

async function createFoods() {
  console.log("Adding Foods");
  await Promise.all([
    foodCreate(0,
      "Potatoes",
      20,
      "2023-12-20",
      [categories[1], categories[2]]
    ),
    foodCreate(1,
      "Bacon",
      15,
      "2023-12-25",
      [categories[0]]
    ),
    foodCreate(2,
      "Gelatin",
      43,
      "2024-07-10",
      [categories[0], categories[2]]
    ),
    foodCreate(3,
      "Cassava flour",
      7,
      "2024-11-25",
      [categories[1], categories[2]]
    ),
    foodCreate(4,
      "Butter",
      23,
      "2024-07-10",
      [categories[0], categories[2]]
    ),
    foodCreate(5,
      "Rice",
      17,
      "2024-11-15",
      [categories[1], categories[2]]
    ),
  ]);
}
