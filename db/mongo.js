const mongoose = require('mongoose');

const individualProducts = new mongoose.Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  defaultPrice: Number
});

const features = new mongoose.Schema({
  id: Number,
  feature: String,
  value: String
});

const styles = new mongoose.Schema({
  id: Number,
  styleId: Number,
  name: String,
  originalPrice: Number,
  salePrice: Number,
  default: Boolean
});

const photos = new mongoose.Schema({
  id: Number,
  styleId: Number,
  thumbnailUrl: String,
  url: String
});

const skus = new mongoose.Schema({
  id: Number,
  skuId: Number,
  quantity: Number,
  size: String
});

const relatedProducts = new mongoose.Schema({
  id: Number,
  relatedId: Number
});

