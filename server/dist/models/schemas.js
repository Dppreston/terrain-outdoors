"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
    title: { type: String },
    color: { type: String },
    brand: { type: String },
    price: { type: Number },
    previewImg: { type: Array },
    category: { type: String },
    desc: { type: String },
    sub: { type: String },
    spcific: { type: String },
    reviews: { type: Array },
    sale: { type: Array },
});
const userSchema = new Schema({
    first: { type: String },
    last: { type: String },
    email: { type: String },
    password: { type: String },
    cart: { type: Array },
    wishlist: { type: Array },
});
const orderSchema = new Schema({
    info: {
        first: { type: String },
        last: { type: String },
        email: { type: String },
    },
    address: {
        address: { type: String },
        apt: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String },
    },
    shipping: {
        option: { type: String },
        price: { type: Number },
    },
    payment: {
        cardName: { type: String },
        cardNumber: { type: String },
        exp: { type: String },
        cvc: { type: String },
    },
    items: { type: Array },
    total: { type: Number },
    orderDate: { type: Date, default: Date.now },
});
const Products = mongoose.model("Products", productSchema, "products");
const Users = mongoose.model("Users", userSchema, "users");
const Orders = mongoose.model("Orders", orderSchema, "orders");
const mySchemas = {
    "Products": Products,
    "Users": Users,
    "Orders": Orders,
};
module.exports = mySchemas;
