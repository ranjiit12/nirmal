const mongoose = require("mongoose"),
      Schema   = mongoose.Schema;

const daySchema = new Schema({
    date: Date,
    classes: [{
        type: Schema.Types.ObjectId,
        ref: "Class"
    }]
});

module.exports = mongoose.model("Day", daySchema);