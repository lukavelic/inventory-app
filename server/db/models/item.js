const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }]
});

module.exports = mongoose.model('Item', itemSchema);