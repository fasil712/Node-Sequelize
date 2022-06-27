const express = require("express");
const router = express.Router();
const delivery_controller = require('../controller/delivery-controller');

router.get('/getDelivery', delivery_controller.getDelivery);
router.post("/addDelivery", delivery_controller.addDelivery);
module.exports = router;