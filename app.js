require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");

const PORT = 5000 || process.env.PORT;
const jwt = require("jsonwebtoken"); 
const trips_routes = require("./routes/trips");
const authRoutes = require('./routes/auth')
const authMiddleware = require('./middleware/authMiddleware');
const User = require('./models/User');

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


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/auth', authRoutes);
app.use(authMiddleware);

app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ message: `Hello user ${req.user.id}, you accessed a protected route!` });
});

start();