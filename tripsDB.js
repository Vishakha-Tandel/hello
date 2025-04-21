require("dotenv").config();
const connectDB = require("./db/connect");
const trips = require("./models/trips");
const Product = require("./models/trips");

const TripsJson = require("./trips.json");

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        //await trips.deleteMany();  ----for delete multiple same data
        await trips.create(TripsJson);
        console.log("success");
        
    } catch (error) {
        console.log(error);  
    }
};

start();