require('dotenv').config();
require('./config/database');
const Category = require('./models/category');


(async function() {
  try {
    console.log("Deleting existing categories...");
    await Category.deleteMany();

    console.log("Creating new categories...");
    const categories = await Category.create([
      {  name: 'Outdoors/Nature' },
      {  name: 'Food' },
      {  name: 'Activities' },
      {  name: 'Festivals' },
      {  name: 'Landmarks' },
    ]);

    console.log("New categories created:", categories);

    // console.log("Fetching categories from the API...");
    // const fetchedCategories = await getAll();
    // console.log("Fetched categories:", fetchedCategories);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    process.exit();
  }
})();