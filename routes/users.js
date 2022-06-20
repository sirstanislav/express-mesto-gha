const router = require("express").Router();
const {
  createUser,
  findUsers,
  findUserById,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");

router.post("/users", createUser);

router.get("/users", findUsers);

router.get("/users/:userId", findUserById);

router.patch("/users/me", updateProfile);

router.patch("/users/me/avatar", updateAvatar);

module.exports = router;
