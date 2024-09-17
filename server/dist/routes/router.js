"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const schemas = require("../models/schemas");
//users
router.get("/users", async (req, res) => {
    const { email, password, loginRequest, initUser, userId } = req.query;
    const users = schemas.Users;
    //login request
    if (loginRequest) {
        const user = await users.find({ email: email }).exec();
        if (user.length > 0) {
            if (user[0].password === password) {
                return res.send(user[0]._id);
            }
            else {
                return res.send(false);
            }
        }
        else {
            return res.send(false);
        }
    }
    //init users
    if (initUser) {
        const userData = await users.find({ _id: userId }).exec();
        if (userData) {
            return res.send(JSON.stringify(userData));
        }
    }
    //
});
router.put("/users", async (req, res) => {
    const { userId, addToCart, productId, quantity, updateQuan, removeCart, removeWLItem, handleWishlist, clearCart, } = req.query;
    const users = schemas.Users;
    const user = await users.find({ _id: userId }).exec();
    const check = user[0].cart.find((el) => el.productId === productId);
    //add to cart
    if (addToCart) {
        //add to cart if not in cart
        if (check === undefined) {
            const action = await users.updateOne({ _id: userId }, {
                $push: {
                    cart: {
                        productId: productId,
                        quantity: Number(quantity),
                        creationDate: new Date(Date.now()),
                    },
                },
            });
            if (action) {
                return res.send(true);
            }
            else {
                return res.send(false);
            }
        }
        else {
            //update quantity if already in cart
            const existingQuantity = check.quantity;
            const action = await users.updateOne({
                _id: userId,
                "cart.productId": productId,
            }, {
                $set: {
                    "cart.$.quantity": existingQuantity + Number(quantity),
                },
            });
            if (action) {
                return res.send(true);
            }
            else {
                return res.send(false);
            }
        }
    }
    //update quan
    if (updateQuan) {
        const update = await users.updateOne({ _id: userId, "cart.productId": productId }, {
            $set: {
                "cart.$.quantity": Number(quantity),
            },
        });
        if (update) {
            return res.send(true);
        }
        else {
            return res.send(false);
        }
    }
    //remove item from cart
    if (removeCart) {
        const action = await users.updateOne({ _id: userId }, {
            $pull: {
                "cart": { "productId": productId },
            },
        });
        if (action) {
            return res.send(true);
        }
        else {
            return res.send(false);
        }
    }
    //remove wislist item
    if (removeWLItem) {
        const action = await users.updateOne({ _id: userId }, {
            $pull: {
                "wishlist": { "productId": productId },
            },
        });
        if (action) {
            return res.send(true);
        }
        else {
            return res.send(false);
        }
    }
    //handle wishlist
    if (handleWishlist) {
        const user = await users.find({
            _id: userId,
        });
        const check = user[0].wishlist.find((el) => el.productId === productId);
        if (check != undefined) {
            await users.updateOne({ _id: userId }, {
                $pull: {
                    "wishlist": { productId: check.productId },
                },
            });
            return res.send(!false);
        }
        else {
            await users.updateOne({ _id: userId }, {
                $push: {
                    "wishlist": {
                        productId: productId,
                        creationDate: new Date(Date.now()),
                    },
                },
            });
            return res.send(!false);
        }
    }
    //clear cart
    if (clearCart) {
        await users.updateOne({ _id: userId }, {
            cart: [],
        });
    }
});
router.post("/users", async (req, res) => {
    const { first, last, email, password } = req.body;
    const { newUser } = req.query;
    if (newUser) {
        let newUserData = {
            first: first,
            last: last,
            email: email,
            password: password,
        };
        const newAccount = new schemas.Users(newUserData);
        const save = await newAccount.save();
        if (save) {
            return res.send(true);
        }
        else {
            return res.send(false);
        }
    }
});
//products
router.get("/products", async (req, res) => {
    const { initProduct, sub, pEnv, product, initCart, productId, quantity, initWishlist, initReviews, loadMoreReviews, existingLength, filters, filterProducts, productSort, sortSelection, productData, selectedPage, promo, promoType, topSellers, topSellerIds, searchContent, search, } = req.query;
    const products = schemas.Products;
    //init sub or specific
    if (pEnv) {
        const viewAllArray = sub.split(" ");
        const viewAllCheck = viewAllArray.includes("all");
        const saleCheck = viewAllArray.includes("sale");
        /// PAGE DETECTION ///
        let end = Number(selectedPage) !== 1 ? Number(selectedPage) * 6 : 6;
        let start = end - 6;
        const filterData = new Array();
        if (viewAllCheck === false && saleCheck === false) {
            /// SUB PRODUCTS ///
            // NO FILTERS SELECTED FOR SUB ///
            const productData = await products.find({ sub: sub }).exec();
            for (let i = 0; i < productData.length; i++) {
                filterData.push({
                    _id: productData[i]._id,
                    color: productData[i].color,
                    brand: productData[i].brand,
                });
            }
            if (productData) {
                if (sortSelection === "undefined") {
                    const limitedProductData = productData.slice(start, end);
                    return res.send(JSON.stringify([limitedProductData, filterData]));
                }
                else {
                    const limitedProductData = productData.slice(start, end);
                    const ss = Number(sortSelection);
                    ///// SORT if no filters are selection  //////
                    if (ss === 2) {
                        return res.send(JSON.stringify([
                            limitedProductData.sort((a, b) => Number(b.price) - Number(a.price)),
                            filterData,
                        ]));
                    }
                    if (ss === 3) {
                        return res.send(JSON.stringify([
                            limitedProductData.sort((a, b) => Number(a.price) - Number(b.price)),
                            filterData,
                        ]));
                    }
                    if (ss === 4) {
                        const topRatingArray = new Array();
                        limitedProductData.forEach((product) => {
                            let sum = 0;
                            if (product.reviews.length > 0) {
                                product.reviews.forEach((el) => {
                                    sum += el.rating;
                                });
                            }
                            topRatingArray.push({
                                _id: product._id,
                                title: product.title,
                                color: product.color,
                                brand: product.brand,
                                previewImg: product.previewImg,
                                price: product.price,
                                category: product.category,
                                desc: product.desc,
                                sub: product.sub,
                                specific: product.specific,
                                reviews: product.reviews,
                                sale: product.sale,
                                rating: sum,
                            });
                        });
                        return res.send(JSON.stringify([
                            topRatingArray.sort((a, b) => b.rating - a.rating),
                            filterData,
                        ]));
                    }
                }
            }
            else {
                const pageProductData = productData.slice(start, end);
                return res.send(JSON.stringify([pageProductData, filterData]));
            }
        }
        else if (viewAllCheck === !false && saleCheck === false) {
            ///  ALL PRODUCTS IN SUB ///
            const productData = await products
                .find({
                category: viewAllArray[1] === "bait"
                    ? "bait & lures"
                    : viewAllArray[1] === "line"
                        ? "line & tackle"
                        : viewAllArray[1],
            })
                .exec();
            for (let i = 0; i < productData.length; i++) {
                filterData.push({
                    _id: productData[i]._id,
                    color: productData[i].color,
                    brand: productData[i].brand,
                });
            }
            if (productData) {
                if (sortSelection === "undefined") {
                    const limitedProductData = productData.slice(start, end);
                    return res.send(JSON.stringify([limitedProductData, filterData]));
                }
                else {
                    ///SPECIFIC SORT ///
                    const limitedProductData = productData.slice(start, end);
                    const ss = Number(sortSelection);
                    /// SORT if no filters are selection ///
                    //1  ==relevance
                    //2 == high-low
                    //3 == low-high
                    //4 == top rated
                    if (ss === 2) {
                        return res.send(JSON.stringify([
                            limitedProductData.sort((a, b) => Number(b.price) - Number(a.price)),
                            filterData,
                        ]));
                    }
                    if (ss === 3) {
                        return res.send(JSON.stringify([
                            limitedProductData.sort((a, b) => Number(a.price) - Number(b.price)),
                            filterData,
                        ]));
                    }
                    if (ss === 4) {
                        const topRatingArray = new Array();
                        limitedProductData.forEach((product) => {
                            let sum = 0;
                            if (product.reviews.length > 0) {
                                product.reviews.forEach((el) => {
                                    sum += el.rating;
                                });
                            }
                            topRatingArray.push({
                                _id: product._id,
                                title: product.title,
                                color: product.color,
                                brand: product.brand,
                                previewImg: product.previewImg,
                                price: product.price,
                                category: product.category,
                                desc: product.desc,
                                sub: product.sub,
                                specific: product.specific,
                                reviews: product.reviews,
                                sale: product.sale,
                                rating: sum,
                            });
                        });
                        return res.send(JSON.stringify([
                            topRatingArray.sort((a, b) => b.rating - a.rating),
                            filterData,
                        ]));
                    }
                }
            }
        }
        else {
            ///SALE PRODUCTS
            const allProducts = await products.find({});
            const saleItems = allProducts.filter((el) => el.sale[0] === true);
            for (let i = 0; i < saleItems.length; i++) {
                filterData.push({
                    _id: saleItems[i]._id,
                    color: saleItems[i].color,
                    brand: saleItems[i].brand,
                });
            }
            //calculate slice adjustment
            if (saleItems) {
                if (sortSelection === "undefined") {
                    const limitedProductData = saleItems.slice(start, end);
                    return res.send(JSON.stringify([limitedProductData, filterData]));
                }
                else {
                    const limitedProductData = saleItems.slice(start, end);
                    const ss = Number(sortSelection);
                    ///// SORT if no filters are selection  //////
                    //1  ==relevance
                    //2 == high-low
                    //3 == low-high
                    //4 == top rated
                    if (ss === 2) {
                        return res.send(JSON.stringify([
                            limitedProductData.sort((a, b) => Number(b.price) - Number(a.price)),
                            filterData,
                        ]));
                    }
                    if (ss === 3) {
                        return res.send(JSON.stringify([
                            limitedProductData.sort((a, b) => Number(a.price) - Number(b.price)),
                            filterData,
                        ]));
                    }
                    if (ss === 4) {
                        const topRatingArray = new Array();
                        limitedProductData.forEach((product) => {
                            let sum = 0;
                            if (product.reviews.length > 0) {
                                product.reviews.forEach((el) => {
                                    sum += el.rating;
                                });
                            }
                            topRatingArray.push({
                                _id: product._id,
                                title: product.title,
                                color: product.color,
                                brand: product.brand,
                                previewImg: product.previewImg,
                                price: product.price,
                                category: product.category,
                                desc: product.desc,
                                sub: product.sub,
                                specific: product.specific,
                                reviews: product.reviews,
                                sale: product.sale,
                                rating: sum,
                            });
                        });
                        return res.send(JSON.stringify([
                            topRatingArray.sort((a, b) => b.rating - a.rating),
                            filterData,
                        ]));
                    }
                }
            }
            else {
                const pageProductData = saleItems.slice(start, end);
                return res.send(JSON.stringify([pageProductData, filterData]));
            }
        }
    }
    //filter for pEnv
    if (filterProducts) {
        const viewAllArray = sub.split(" ");
        const viewAllCheck = viewAllArray.includes("all");
        const saleCheck = viewAllArray.includes("sale");
        /// PAGE DETECTION ///
        let end = Number(selectedPage) !== 1 && selectedPage != "undefined"
            ? Number(selectedPage) * 6
            : 6;
        let start = end - 6;
        let filteredProductsArr = new Array();
        const parsedFilters = JSON.parse(filters);
        const brandsArr = parsedFilters
            .filter((el) => el.title === "brand")
            .flatMap((el) => el.option);
        const colorArr = parsedFilters
            .filter((el) => el.title === "color")
            .flatMap((el) => el.option);
        if (viewAllCheck === false && saleCheck === false) {
            / BRAND && COLOR FILTER INIT /; //
            if (brandsArr.length > 0) {
                for (let i = 0; i < brandsArr.length; i++) {
                    const fetch = await products
                        .find({
                        sub: sub,
                        brand: brandsArr[i],
                    })
                        .exec();
                    filteredProductsArr.push(...fetch.slice(start, end));
                    const colorsArraySelected = new Array();
                    if (brandsArr.length > 0 && colorArr.length > 0) {
                        for (let y = 0; y < colorArr.length; y++) {
                            const adjust = await products.find({
                                sub: sub,
                                brand: brandsArr[i],
                                color: colorArr[y],
                            });
                            colorsArraySelected.push(...adjust);
                        }
                        return res.send(JSON.stringify(colorsArraySelected.slice(start, end)));
                    }
                }
                return res.send(JSON.stringify(filteredProductsArr));
            }
            else if (brandsArr.length === 0 && colorArr.length > 0) {
                /// COLOR ONLY ///
                for (let x = 0; x < colorArr.length; x++) {
                    const fetch = await products.find({ sub: sub, color: colorArr[x] });
                    filteredProductsArr.push(...fetch);
                }
                return res.send(JSON.stringify(filteredProductsArr));
            }
            else {
                return res.send(false);
            }
        }
        else if (viewAllCheck === !false && saleCheck === false) {
            /// BRAND & COLOR VIEW ALL ///
            if (brandsArr.length > 0) {
                for (let i = 0; i < brandsArr.length; i++) {
                    const fetch = await products
                        .find({
                        category: viewAllArray[1] === "line"
                            ? "line & tackle"
                            : viewAllArray[1] === "bait"
                                ? "bait & lures"
                                : viewAllArray[1],
                        brand: brandsArr[i],
                    })
                        .exec();
                    filteredProductsArr.push(...fetch.slice(start, end));
                    const colorsArraySelected = new Array();
                    if (brandsArr.length > 0 && colorArr.length > 0) {
                        for (let y = 0; y < colorArr.length; y++) {
                            const adjust = await products.find({
                                category: viewAllArray[1] === "line"
                                    ? "line & tackle"
                                    : viewAllArray[1] === "bait"
                                        ? "bait & lures"
                                        : viewAllArray[1],
                                brand: brandsArr[i],
                                color: colorArr[y],
                            });
                            colorsArraySelected.push(...adjust);
                        }
                        return res.send(JSON.stringify(colorsArraySelected.slice(start, end)));
                    }
                }
                return res.send(JSON.stringify(filteredProductsArr));
            }
            else if (brandsArr.length === 0 && colorArr.length > 0) {
                /// COLOR ONLY
                for (let x = 0; x < colorArr.length; x++) {
                    const fetch = await products.find({
                        category: viewAllArray[1] === "line"
                            ? "line & tackle"
                            : viewAllArray[1] === "bait"
                                ? "bait & lures"
                                : viewAllArray[1],
                        color: colorArr[x],
                    });
                    filteredProductsArr.push(...fetch);
                }
                return res.send(JSON.stringify(filteredProductsArr.slice(start, end)));
            }
            else {
                return res.send(false);
            }
        }
        else {
            /// Sale Sort
            const fetchAll = await products.find({});
            const fetchSale = fetchAll.filter((el) => el.sale[0] === true);
            if (brandsArr.length > 0) {
                for (let i = 0; i < brandsArr.length; i++) {
                    const filterBrand = fetchSale.filter((el) => el.brand === brandsArr[i]);
                    filteredProductsArr.push(...filterBrand.slice(start, end));
                    const colorsArraySelected = new Array();
                    if (brandsArr.length > 0 && colorArr.length > 0) {
                        for (let y = 0; y < colorArr.length; y++) {
                            const colorFilter = filteredProductsArr.filter((el) => el.color === colorArr[y]);
                            colorsArraySelected.push(...colorFilter);
                        }
                        return res.send(JSON.stringify(colorsArraySelected.slice(start, end)));
                    }
                }
                return res.send(JSON.stringify(filteredProductsArr));
            }
            else if (brandsArr.length === 0 && colorArr.length > 0) {
                /// COLOR ONLY
                for (let x = 0; x < colorArr.length; x++) {
                    const colorFiltered = fetchSale.filter((el) => el.color === colorArr[x]);
                    filteredProductsArr.push(...colorFiltered);
                }
                return res.send(JSON.stringify(filteredProductsArr.slice(start, end)));
            }
            else {
                return res.send(false);
            }
        }
    }
    if (productSort) {
        const ss = Number(sortSelection);
        const data = JSON.parse(productData);
        //1  ==relevance
        //2 == high-low
        //3 == low-high
        //4 == top rated
        if (ss === 2) {
            return res.send(JSON.stringify([
                data.sort((a, b) => Number(b.price) - Number(a.price)),
            ]));
        }
        if (ss === 3) {
            return res.send(JSON.stringify([
                data.sort((a, b) => Number(a.price) - Number(b.price)),
            ]));
        }
        if (ss === 4) {
            const topRatingArray = new Array();
            data.forEach((product) => {
                let sum = 0;
                if (product.reviews.length > 0) {
                    product.reviews.forEach((el) => {
                        sum += el.rating;
                    });
                }
                topRatingArray.push({
                    _id: product._id,
                    title: product.title,
                    color: product.color,
                    brand: product.brand,
                    previewImg: product.previewImg,
                    price: product.price,
                    category: product.category,
                    desc: product.desc,
                    sub: product.sub,
                    specific: product.specific,
                    reviews: product.reviews,
                    sale: product.sale,
                    rating: sum,
                });
            });
            return res.send(JSON.stringify([topRatingArray.sort((a, b) => b.rating - a.rating)]));
        }
    }
    //specific product
    if (initProduct) {
        const productData = await products.find({ title: product }).exec();
        if (productData) {
            return res.send(JSON.stringify(productData));
        }
    }
    //init cart
    if (initCart) {
        const cartData = new Array();
        const ids = productId.split(",");
        const quan = quantity.split(",");
        if (ids[0] != "") {
            for (let i = 0; i < ids.length; i++) {
                const productData = await products.find({ _id: ids[i] }).exec();
                for (let y = 0; y < productData.length; y++) {
                    cartData.push({
                        _id: productData[y]._id,
                        title: productData[y].title,
                        previewImg: productData[y].previewImg[0],
                        price: productData[y].sale[0] === true
                            ? Number(productData[y].sale[1])
                            : productData[y].price,
                        quantity: Number(quan[i]),
                    });
                }
            }
        }
        return res.send(JSON.stringify(cartData));
    }
    //init wishlist
    if (initWishlist) {
        const wishlistData = new Array();
        const ids = productId.split(",");
        if (ids[0] != "") {
            for (let i = 0; i < ids.length; i++) {
                const productData = await products.find({ _id: ids[i] }).exec();
                for (let y = 0; y < productData.length; y++) {
                    wishlistData.push({
                        _id: productData[y]._id,
                        title: productData[y].title,
                        previewImg: productData[y].previewImg[0],
                        price: productData[y].sale[0] === true
                            ? Number(productData[y].sale[1])
                            : productData[y].price,
                    });
                }
            }
        }
        if (wishlistData) {
            return res.send(JSON.stringify(wishlistData));
        }
    }
    //init reviews
    const reviewBarData = new Array();
    if (initReviews) {
        const product = await products.find({ _id: productId });
        const reviewsLength = product[0].reviews.length;
        for (let i = 0; i < reviewsLength; i++) {
            reviewBarData.push({ rating: product[0].reviews[i].rating });
        }
        if (product && (filters == "undefined" || filters?.length === 0)) {
            const limitedReviews = product[0].reviews.splice(0, 10);
            return res.send(JSON.stringify([limitedReviews, reviewsLength, reviewBarData]));
        }
        else {
            //filter reviews
            const filteredReviewData = new Array();
            const limitedFilteredData = new Array();
            const filtersArr = filters.split(",");
            for (let i = 0; i < filtersArr.length; i++) {
                let filtered = product[0].reviews.filter((el) => el.rating === Number(filtersArr[i]));
                filteredReviewData.push(...filtered);
                limitedFilteredData.push(...filtered.splice(0, 10));
            }
            if (filteredReviewData) {
                return res.send([limitedFilteredData, filteredReviewData.length]);
            }
        }
    }
    //load more reviews
    if (loadMoreReviews) {
        const product = await products.find({ _id: productId }).exec();
        if (filters === "undefined" || filters?.length === 0) {
            const updatedReviewData = product[0].reviews.splice(0, Number(existingLength) + 10);
            if (updatedReviewData) {
                res.send(JSON.stringify(updatedReviewData));
            }
        }
        else {
            //load more filtered reviews
            const limitedFilteredData = new Array();
            const filtersArr = filters.split(",");
            for (let i = 0; i < filtersArr.length; i++) {
                let filtered = product[0].reviews.filter((el) => el.rating === Number(filtersArr[i]));
                limitedFilteredData.push(...filtered.splice(0, Number(existingLength) + 10));
            }
            if (limitedFilteredData) {
                return res.send(limitedFilteredData);
            }
        }
    }
    //promo data
    if (promo) {
        const productData = await products.find({}).exec();
        //Top Rated
        if (promoType === "2") {
            const ratingArrFinal = new Array();
            //calculate totals and get ids
            const ratingDataArr = productData
                .filter((all) => all.reviews.length != 0)
                .flatMap((data) => [
                {
                    _id: data._id,
                    total: data.reviews
                        .flatMap((rating) => rating.rating)
                        .reduce((acc, curr) => acc + curr) / data.reviews.length,
                },
            ]);
            //fetch the products and sort them based on the avg rating
            if (ratingDataArr.length > 0) {
                for (let i = 0; i < ratingDataArr.length; i++) {
                    const productData = await products.find({
                        _id: ratingDataArr[i]._id,
                    });
                    ratingArrFinal.push([...productData, ratingDataArr[i].total]);
                }
                return res.send(JSON.stringify(ratingArrFinal.sort((a, b) => b[1] - a[1]).splice(0, 10)));
            }
        }
        //Sale Items
        if (promoType === "3") {
            let filteredSaleItems = productData.filter((data) => data.sale.includes(true));
            //shuffle the items
            if (filteredSaleItems.length > 0) {
                let cI = filteredSaleItems.length;
                while (cI != 0) {
                    let rI = Math.floor(Math.random() * cI);
                    cI--;
                    [filteredSaleItems[cI], filteredSaleItems[rI]] = [
                        filteredSaleItems[rI],
                        filteredSaleItems[cI],
                    ];
                }
                return res.send(JSON.stringify(filteredSaleItems.splice(0, 10)));
            }
        }
    }
    //top sellers
    if (topSellers) {
        const topSellersArr = new Array();
        const topSellerIdsParsed = JSON.parse(topSellerIds);
        for (let i = 0; i < topSellerIdsParsed.length; i++) {
            const productData = await products.find({ _id: topSellerIdsParsed[i] }, {
                title: 1,
                price: 1,
                previewImg: 1,
                category: 1,
                sub: 1,
                reviews: 1,
                sale: 1,
            });
            topSellersArr.push(...productData);
        }
        return res.send(topSellersArr.splice(0, 10));
    }
    //search
    if (search) {
        const allProductData = await products.find({}).exec();
        const searchSplit = searchContent.toLowerCase().split("");
        const wordSplit = searchContent.toLowerCase().split(" ");
        /// filter for specific word
        const filterProductsWord = allProductData.filter((word) => wordSplit.every((full) => word.title.toLowerCase() === full ||
            word.brand.toLowerCase() === full ||
            word.color.toLowerCase() === full ||
            word.sub.toLowerCase() === full ||
            word.category.toLowerCase() === full));
        const fullLength = filterProductsWord.length;
        if (filterProductsWord.length > 0) {
            return res.send(JSON.stringify(filterProductsWord));
        }
        else {
            /// if no specific word is found ? filter letters
            const filterProductsChar = allProductData.filter((word) => searchSplit.every((char) => word.title.toLowerCase().includes(char) ||
                word.brand.toLowerCase().includes(char) ||
                word.color.toLowerCase().includes(char) ||
                word.sub.toLowerCase().includes(char) ||
                word.category.toLowerCase().includes(char)));
            if (filterProductsChar.length > 0) {
                return res.send(JSON.stringify(filterProductsChar));
            }
        }
    }
});
router.put("/products", async (req, res) => {
    const products = schemas.Products;
    const { addReview, productId, reviewData } = req.query;
    if (addReview) {
        const parsedReviewData = JSON.parse(reviewData);
        if (parsedReviewData) {
            const action = await products.updateOne({ _id: productId }, {
                $push: {
                    "reviews": {
                        _id: new Date().getTime().toString().substring(8) +
                            Math.floor(Math.random() * (99999 - 10000)) +
                            100000,
                        rating: parsedReviewData.rating,
                        username: parsedReviewData.username,
                        summary: parsedReviewData.summary,
                        content: parsedReviewData.review,
                        userId: parsedReviewData.userId,
                        creationDate: new Date(Date.now()),
                    },
                },
            });
            if (action) {
                return res.send(!false);
            }
        }
    }
});
// Orders
router.post("/orders", async (req, res) => {
    const { submitOrder, info, shipping, payment, cart, total } = req.query;
    if (submitOrder) {
        const infoParsed = JSON.parse(info);
        const shippingParsed = JSON.parse(shipping);
        const paymentParsed = JSON.parse(payment);
        const cartParsed = JSON.parse(cart);
        let orderData = {
            info: {
                first: infoParsed.first,
                last: infoParsed.last,
                email: infoParsed.email,
            },
            address: {
                address: infoParsed.address,
                apt: infoParsed.apt,
                city: infoParsed.city,
                state: infoParsed.state,
                zip: infoParsed.zip,
            },
            shipping: {
                option: shippingParsed.title,
                price: Number(shippingParsed.price),
            },
            payment: {
                cardName: paymentParsed.name,
                cardNumber: paymentParsed.card,
                exp: `${paymentParsed.m}/${paymentParsed.y}`,
                cvc: paymentParsed.cvc,
            },
            items: cartParsed.flatMap((data) => data),
            total: Number(total),
        };
        if (orderData) {
            const newOrder = new schemas.Orders(orderData);
            const saveOrder = newOrder.save();
            if (saveOrder) {
                return res.send(true);
            }
            else {
                return res.send(false);
            }
        }
    }
});
router.get("/orders", async (req, res) => {
    const orders = schemas.Orders;
    const { promo, promoType } = req.query;
    //top sellers promo
    if (promo) {
        const orderItemArray = new Array();
        // Top Sellers
        if (promoType === "1") {
            const allOrderData = await orders.find({}).exec();
            //handle item ids from orders
            allOrderData.forEach((order) => order.items.forEach((item) => orderItemArray.push(item._id)));
            //handle freq of items
            const freqArray = new Array();
            if (orderItemArray.length > 0) {
                let count = {};
                let j = orderItemArray.length;
                for (let i = 0; i < j; i++) {
                    count[orderItemArray[i]] = (count[orderItemArray[i]] || 0) + 1;
                }
                Object.entries(count).forEach((el) => freqArray.push({ _id: el[0], count: el[1] }));
                //filter top freq ids
                const sorted = freqArray.sort((a, b) => b.count - a.count).slice(0, 4);
                if (sorted) {
                    return res.send(JSON.stringify(sorted));
                }
            }
        }
    }
});
module.exports = router;
exports.default = router;
