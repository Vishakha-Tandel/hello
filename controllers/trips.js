const Trips = require("../models/trips")

const getAllTrips = async(req,res) => {

    const { destination, departing_from, trip_type, sort, select } = req.query;
    const queryObject = {};

    if (destination) {
        queryObject.destination = { $regex : destination, $options : "i" };
    }

    if (departing_from) {
        queryObject.departing_from = { $regex : departing_from, $options : "i" };
    }

    if (trip_type) {
        queryObject.trip_type = trip_type;
    }

    let apiData = Trips.find(queryObject);

    if (sort) {
        let sortFix = sort.replace(",", " ");
        apiData = apiData.sort(sortFix);
    }

    if (select) {
        // let selectFix = select.replace(",", " ");
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 9;

    let skip = (page - 1) * limit;

    apiData = apiData.skip(skip).limit(limit);

    console.log(queryObject);

    const YourTrips = await apiData;
    // const myData = await Trips.find(req.query); -----for select by key:value pair
    res.status(200).json({ YourTrips, nbHits: YourTrips.length });
};

module.exports = {getAllTrips};