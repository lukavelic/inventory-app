const express = require("express");
const dbConnect = require("./db/dbConnect");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Config CORS
app.use(cors());

// Config routes
app.use("/", require("./routes"));

// Connect to MongoDB
dbConnect();

app.get("/", (req, res) => {
    res.json({ msg: "Hey" });
});

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
