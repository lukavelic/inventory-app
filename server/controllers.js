const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

    User.findOne({
        username: req.body.username,
    })
        .then((result) => {
            if (result) {
                res.status(208).send({
                    msg: "Username is taken",
                    result,
                });
            } else {
                bcrypt.genSalt(saltRounds, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) {
                            res.status(500).send({
                                msg: "Error hashing password",
                                err,
                            });
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
                                console.log({ err });
                                res.status(500).send({
                                    msg: "Error creating user",
                                    err,
                                });
                            });
                    });
                });
            }
        })
        .catch((err) => {
            res.status(500).send({ err });
        });
};

exports.login = async (req, res) => {
    console.log("hit login", req.body);

    User.findOne({ username: req.body.username })
        .then((user) => {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    res.status(401).send({
                        msg: "Passwords do not match",
                        err,
                    });
                } else {
                    const token = jwt.sign(
                        {
                            userId: user._id,
                            username: user.username,
                        },
                        "RANDOM-TOKEN",
                        { expiresIn: "30 days" }
                    );

                    res.status(200).send({
                        msg: "Login successful",
                        username: user.username,
                        userId: user._id,
                        token,
                    });
                }
            });
        })
        .catch((err) => {
            res.status(404).send({ msg: "Username not found", err });
        });
};
