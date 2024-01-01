const router = require("express").Router();
const { authenticateUser } = require("../middleware/authentication");
const { showMe } = require("../controller/userCtrl");

router.get("/showMe", authenticateUser, showMe);

module.exports = router;
