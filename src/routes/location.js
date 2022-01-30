const express = require("express");
const router = express.Router();
const controller = require("../controller/location_controller");

router.post(
    "/create",
    controller.create
);
    
router.get(
    "/getLocation",
    controller.getLocations
);

router.put(
    "/updateLocation/:guid",
    controller.updateLocations
);

module.exports = router;
