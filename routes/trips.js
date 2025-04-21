const express = require("express");
const router = express.Router();

const {getAllTrips} = require("../controllers/trips")

router.route("/").get(getAllTrips);

module.exports = router;