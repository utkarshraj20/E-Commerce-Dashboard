const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    cateogry: String,
    company: String,
    userId: String
})

module.exports = mongoose.model("products", productSchema);