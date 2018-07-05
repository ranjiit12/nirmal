const mongoose = require("mongoose"),
      Schema   = mongoose.Schema;

const scheduleSchema = new Schema({
    days: [{
        type: Schema.Types.ObjectId,
        ref: "Day"
    }]
});

module.exports = mongoose.model("Schedule", daySchema);