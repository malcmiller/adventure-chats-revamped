const jwt = require("jsonwebtoken");

const NOT_AUTHORIZED_MSG = "User not authorized!";
const { SECRET } = process.env;

function checkAuthorization(req, res, next) {
  const { authorizationToken } = req.get("authorization");

  if (!authorizationToken) {
    res.status(401).json({ message: NOT_AUTHORIZED_MSG });
  }

  jwt.verify(authorizationToken, SECRET, (error, decode) => {
    if (error) {
      res.status(401).json({ message: NOT_AUTHORIZED_MSG });
    }

    const { user } = decode;

    if (!user) {
      res.status(401).json({ message: NOT_AUTHORIZED_MSG });
    }
  });

  next();
}

module.exports = checkAuthorization;
