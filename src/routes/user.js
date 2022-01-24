const express = require("express");
const router = express.Router();
const controller = require("../controller/user_controller");
const { checkRequest, requiredRequest } = require("../utils");

router.post(
    "/create",
    controller.create
);
    
router.get(
    "/getByStatusAll/:status",
    controller.getByStatusAll
);
    
router.get(
    "/getById/:guid",
    controller.getById
);
    
router.get(
    "/getByStatus/:status",
    controller.getByStatus
);

router.put(
    "/:guid",
    controller.updateOne
);

router.put(
    "/updateStatus/:guid",
    controller.updateStatus
);

// router.delete(
//     "/:guid",
//     checkRequest(requiredRequest.authorization),
//     controllers.deleteOne
// );

module.exports = router;
