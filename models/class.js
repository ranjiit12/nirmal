const mongoose = require("mongoose"),
      Schema   = mongoose.Schema;

const daySchema = new Schema({
    date: Date,
    teacherName: {
        type:String,
    },
    timing: {
        type:String
    },
    className: {
        type:String
    }
});

module.exports = mongoose.model("Day", daySchema);