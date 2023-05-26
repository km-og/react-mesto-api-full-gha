/* eslint-disable linebreak-style */
/* eslint-disable no-else-return */
/* eslint-disable no-useless-return */
const { mongoose } = require("mongoose");
const Card = require("../models/card");
const BadReqErr = require("../errors/BadReqErr");
const NotFoundErr = require("../errors/NotFoundErr");
const ForbiddenErr = require("../errors/ForbiddenErr");

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      next(err);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadReqErr("Переданы некорректные данные карточки"));
        return;
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (req.user._id === card.owner.toString()) {
        card
          .deleteOne()
          .then((delCard) => {
            res.send({ data: delCard });
          })
          .catch((err) => {
            next(err);
          });
      } else {
        throw new ForbiddenErr("Доступ к запрошенному ресурсу запрещен");
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundErr("Карточка с указанным _id не найдена"));
        return;
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((like) => {
      res.send({ data: like });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadReqErr("Переданы некорректные данные карточки"));
        return;
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundErr("Карточка с указанным _id не найдена"));
        return;
      } else {
        next(err);
      }
    });
};

const dislikeCards = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((dislike) => {
      res.send({ data: dislike });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadReqErr("Переданы некорректные данные карточки"));
        return;
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundErr("Карточка с указанным _id не найдена"));
        return;
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCards,
};
