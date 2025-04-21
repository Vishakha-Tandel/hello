require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const PORT = 5000 || process.env.PORT;

const trips_routes = require("./routes/trips");

app.get("/", (req,res) => {
    res.send("Hi, i am live");
});

//middleware or set router
app.use("/api/trips", trips_routes);

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`${PORT} Yes i am conncted....`);
            
        });
    } catch (error) {
    console.log(error);
    }
};

start();