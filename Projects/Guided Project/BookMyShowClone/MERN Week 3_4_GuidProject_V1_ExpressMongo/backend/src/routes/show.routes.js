const express = require("express");
const router = express.Router();
const showController = require("../controllers/show.controller");
const {protect} = require("../middleware/auth.middleware");
const {authorize} = require("../middleware/role.middleware");

// Public route
router.get("/",showController.getShows);
router.get("/:id",showController.getShowById);

//Admin only routes
router.post("/",protect,authorize("admin"),showController.createShow);
router.put("/:id",protect,authorize("admin"),showController.udpateShow);
router.delete("/:id",protect,authorize("admin"),showController.deleteShow);
module.exports = router;