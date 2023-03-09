const mongoose = require("mongoose");
const Category = require("./db/models/category");
const Item = require("./db/models/item");

exports.category = async (req, res) => {
    console.log("hit category", req.params);

    const category = new Category({
        name: req.params.category,
    });

    category
        .save()
        .then((result) => {
            res.status(200).send({ msg: "Category created", result });
        })
        .catch((err) => {
            res.status(500).send({ msg: "Error creating category", err });
        });
};

exports.register = async (req, res) => {
    console.log("hit register", req.body);
    res.status(200).send({ msg: "Success" });

    // const user = new User({
    //     username: req.params.category,
    //     password
    // });

    // category.save()
    //     .then((result) => {
    //         res.status(200).send({ msg: 'Category created', result })
    //     })
    //     .catch((err) => {
    //         res.status(500).send({ msg: 'Error creating category', err })
    //     })
};

exports.login = async (req, res) => {
    console.log("hit login", req.body);
    res.status(200).send({ msg: "Success" });
};
