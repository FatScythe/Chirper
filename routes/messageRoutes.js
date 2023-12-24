const router = require("express").Router();
const {
  createMessage,
  getChatMessages,
  editMessage,
  deleteMessage,
} = require("../controller/messageCtrl");
const { authenticateUser } = require("../middleware/authentication");

router.post("/", authenticateUser, createMessage);

router
  .route("/:id")
  .get(authenticateUser, getChatMessages)
  .patch(authenticateUser, editMessage)
  .delete(authenticateUser, deleteMessage);

module.exports = router;
