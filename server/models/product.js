const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productsSchema = new Schema({
      "brand":{
        type: String,
        required: true
      },
      "model":{
        type: String,
        required: true
      },
      "images":{
        type: [{
            type: String
        }],
        default:[]
      },
      "price":{
        type: String,
        required:true
      },
      "description":{
        type: String,
        required:false
      },
      "dealershipDetails":{
        type: String,
        required:false
      }
},{timestamps: true});


module.exports = mongoose.model('productsList', productsSchema,"productsList");
