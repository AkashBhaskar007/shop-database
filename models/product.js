const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    productName: String,
    productDescription: String,
    price: Number,
   });
module.exports = mongoose.model('Product', productSchema);