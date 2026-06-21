// MERN_Stu_FebMay26Mys\W9\D0\movie-booking-backend\src\routes\admin.routes.js
const express = require("express");


const router = express.Router();


const adminController = require("../controllers/admin.controller");


const { protect } = require("../middleware/auth.middleware");


const { authorize } = require("../middleware/role.middleware");


/*
-----------------------------------------
ADMIN DASHBOARD
-----------------------------------------
*/


router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  adminController.getDashboardStats,
);


module.exports = router;
