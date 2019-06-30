const express = require('express');
const router = express.Router();

const jwtHelper = require("../config/jwtHelper");

const AuthController = require("../controllers/auth.controller");
const UserController = require("../controllers/user.controller");
const ProductController = require("../controllers/product.controller");
const BillController = require("../controllers/bill.controller");

//authentication
router.post("/auth/register", AuthController.register);
router.post("/auth/authenticate", AuthController.authenticate);
//user
router.get("/user/find/:id", jwtHelper.verifyJwtToken, UserController.findUser);
router.get("/user/profile", jwtHelper.verifyJwtToken, UserController.userProfile);
//product
router.get("/product/all", jwtHelper.verifyJwtToken, ProductController.all);
//my products
router.post("/myproducts/register",jwtHelper.verifyJwtToken,ProductController.register);
router.get(
  "/myproducts/details/:id",
  jwtHelper.verifyJwtToken,
  ProductController.details
);
router.get(
  "/myproducts",
  jwtHelper.verifyJwtToken,
  ProductController.myProducts
);
router.delete(
  "/myproducts/:id",
  jwtHelper.verifyJwtToken,
  ProductController.delete
);
router.put(
  "/myproducts/:id",
  jwtHelper.verifyJwtToken,
  ProductController.update
);
//bill
router.post(
  "/bill/checkin",
//   jwtHelper.verifyJwtToken,
  BillController.checkin
);
router.get(
  "/bill/destroy",
  jwtHelper.isAdmin,
  BillController.destroy
);


module.exports = router;
