const express = require('express');
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");
const {
    getOrderById,
    createOrder,
    getAllOrders,
    getOrderStatus,
    updateStatus
} = require('../controllers/order');

//----Documentation----
//https://www.npmjs.com/package/express
//https://www.npmjs.com/package/express-router

//----My Routes----

//Params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//Actual Routes

//Create
router.post(
    "/order/create/:userId",
    isSignedIn,
    isAuthenticated,
    pushOrderInPurchaseList,
    updateStock,
    createOrder
);

//Read
router.get(
    "/order/all/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getAllOrders
);

//Status of order
router.get(
    "/order/status/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    getOrderStatus
);

//Update status of order
router.put(
    "/order/:orderId/status/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateStatus
);

module.exports = router;

