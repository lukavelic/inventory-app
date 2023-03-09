const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Category = require("./db/models/category");
const Item = require("./db/models/item");
const User = require("./db/models/user");

// bcrypt
const saltRounds = 10;

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

    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
                res.status(500).send({ msg: "Error hashing password", err });
            }

            const user = new User({
                username: req.body.username,
                password: hash,
            });

            user.save()
                .then((result) => {
                    res.status(201).send({
                        msg: "User successfully created!",
                        result,
                    });
                })
                .catch((err) => {
                    res.status(500).send({
                        msg: "Error creating user",
                        err,
                    });
                });
        });
    });
};

exports.login = async (req, res) => {
    console.log("hit login", req.body);
    res.status(200).send({ msg: "Success" });
};
