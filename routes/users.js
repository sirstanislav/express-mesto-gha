const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { REG_LINK } = require('../const/const');

const {
  findUsers,
  findUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', findUsers);

router.get('/users/:userId', celebrate({
  // валидируем параметры
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), findUserById);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(REG_LINK),
  }),
}), updateAvatar);

module.exports = router;
