const express = require("express");
const router = express.Router();
const controller = require("../controller/report_controller");
const { checkRequest, requiredRequest } = require("../utils");

router.post(
    "/create",
    controller.create
);

router.get(
    "/getById/:guid",
    controller.getById
);

router.get(
    "/getReportAll/:status",
    controller.getReportAll
);

router.get(
    "/getReportAllDetail/:guid",
    controller.getReportAllDetail
);

router.put(
    "/:guid",
    controller.updateOne
);

// router.delete(
//     "/:guid",
//     checkRequest(requiredRequest.authorization),
//     controllers.deleteOne
// );

module.exports = router;
