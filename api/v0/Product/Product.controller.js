'use strict';
const Product = require('./Product.model');

module.exports = {
    createProduct: (req, res, next) => {
        Product.create(req.body, (err, product) => {
            if (err) { return next(err); }
            res.json(product);
        });
    },
    findProduct: (req, res, next) => {
        Product.find((err, products) => {
            if (err) { return next(err); }
            res.json(products);
        });
    },
    findProductById: (req, res, next) => {
        Product.findById(req.params.id, (err, product) => {
            if (err) { return next(err); }
            res.json(product);
        });
    },
    updateProduct: (req, res, next) => {
        Product.findByIdAndUpdate(req.params.id, req.body, (err, product) => {
            if (err) { return next(err) }
            res.json(product);
        });
    },
    removeProduct: (req, res, next) => {
        Product.findByIdAndRemove(req.params.id, (err, product) => {
            if (err) { return next(err); }
            res.json(product);
        });
    }
}
