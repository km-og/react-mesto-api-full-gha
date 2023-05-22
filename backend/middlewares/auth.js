/* eslint-disable linebreak-style */
const jwt = require("jsonwebtoken");
const UnauthErr = require("../errors/UnauthErr");

const { JWT_SECRET } = process.env;
// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthErr("Необходима авторизация"));
    // eslint-disable-next-line no-else-return
  } else {
    const tokenFromHeaders = authorization.replace("Bearer ", "");
    let payload;

    try {
      payload = jwt.verify(tokenFromHeaders, JWT_SECRET);
    } catch (err) {
      return next(new UnauthErr("Необходима авторизация"));
    }
    req.user = payload;
    next();
  }
};
