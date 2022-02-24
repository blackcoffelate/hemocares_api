require("dotenv").config();

const mongoURL = process.env.NODE_ENV === "production" ? process.env.MONGO_PROD : process.env.MONGO_DEV;
const mongoOptions = {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false
};

const allowedOrigins = [/.*./];

if (process.env.NODE_DEV === "development") {
    allowedOrigins.push(/.*./);
}

const cors = (req, res, next) => {
    const requestHost = req.get("origin") || req.get("host");
    if (allowedOrigins.some((origin) => requestHost.match(origin))) {
        res.header("Access-Control-Allow-Origin", req.get("origin"));
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    next();
};

module.exports = {
    mongoURL,
    mongoOptions,
    cors
};