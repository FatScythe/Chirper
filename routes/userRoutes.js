const router = require("express").Router();
const { authenticateUser } = require("../middleware/authentication");
const { showMe, getUsers } = require("../controller/userCtrl");

router.get("/showMe", authenticateUser, showMe);
router.get("/users", authenticateUser, getUsers);

module.exports = router;
