const routes = require("express").Router();
const { category, register, login } = require("./controllers");

routes.get("/inventory/:category", category);
routes.post("/register", register);
routes.post("/login", login);

module.exports = routes;
