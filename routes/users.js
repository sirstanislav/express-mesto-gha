const router = require("express").Router();
const {
  createUser,
  findUsers,
  findUserById,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

router.post("/", createUser);

router.get("/", findUsers);

router.get("/:id", findUserById);

router.patch("/me", updateProfile);

router.patch("/me/avatar", updateAvatar);

module.exports = router;
