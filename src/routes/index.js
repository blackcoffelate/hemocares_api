const express = require("express");
const router = express.Router();
const authController = require("../controller/auth_controller");
const { requestResponse } = require("../utils/index");
const user = require("./user");
const report = require("./report");
const location = require("./location");

let response;

router.get(
  "/",
  (req, res) => {
    response = requestResponse.success;
    response.message = "HEMOCARES - API!";
    res.status(response.code).json(response);
  }
);
router.post(
  "/user/login",
  // checkRequest(requiredRequest.admin_login),
  authController.login
);

router.use("/user", user);
router.use("/report", report);
router.use("/location", location);

module.exports = router;
