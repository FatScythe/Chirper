const router = require("express").Router();
const {
  createChat,
  getMyChats,
  getSingleChat,
  deleteChat,
  addGroupMember,
  leaveGroup,
} = require("../controller/chatCtrl");
const { authenticateUser } = require("../middleware/authentication");

router
  .route("/")
  .get(authenticateUser, getMyChats)
  .post(authenticateUser, createChat);

router.patch("/add", authenticateUser, addGroupMember);
router.patch("/leave", authenticateUser, leaveGroup);

router
  .route("/:id")
  .get(authenticateUser, getSingleChat)
  .delete(authenticateUser, deleteChat);

module.exports = router;
