const router = require("express").Router();
const {
  returnCards,
  createCard,
  deleteCard,
  setLike,
  unsetLike,
} = require("../controllers/users");

router.get("/", returnCards);

router.post("/", createCard);

router.delete("/:id", deleteCard);

router.put("/:cardId/likes", setLike);

router.delete("/:cardId/likes", unsetLike);

module.exports = router;
