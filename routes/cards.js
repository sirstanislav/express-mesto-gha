const router = require("express").Router();
const {
  returnCards,
  createCard,
  deleteCard,
  setLike,
  unsetLike,
} = require("../controllers/cards");

router.get("/cards", returnCards);

router.post("/cards", createCard);

router.delete("/cards/:cardId", deleteCard);

router.put("/cards/:cardId/likes", setLike);

router.delete("/cards/:cardId/likes", unsetLike);

module.exports = router;
