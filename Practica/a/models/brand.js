const mongoose = require('mongoose');
const { router } = require('../app');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    name: String,
    description: String
});

const Brand = mongoose.model('Brand', brandSchema);



module.exports = Brand;