const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    departing_from: {
            type: String,
            required: true,
    },
    destination: {
            type: String,
            enum: {
                values: ["kashmir", "Kerela", "Mumbai", "Goa", "Kerala", "Agra", "Jaipur", "Shimla"],
                message: `{VALUE} is not supported`,
            },
            required: true,
    },
    start_date: {
            type: Date,
            required: true,
    },
    end_date: {
            type: Date,
            required: true,
    },
    trip_type: {
            type: String,
            required: true,
    },
    budget: {
            type: Number,
            required: true,
    },
});


module.exports = mongoose.model("Trips", userSchema);