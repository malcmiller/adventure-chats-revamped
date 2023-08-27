const jwt = require("jsonwebtoken");

const NOT_AUTHORIZED_MSG = "Not authorized!";
const { SECRET } = process.env;

function checkAuthorization(req, res, next) {
  const authorizationHeader = req.get("authorization");

  if (!authorizationHeader) {
    res.status(401).json({ message: NOT_AUTHORIZED_MSG });
  }

  const { token } = authorizationHeader;

  if (!token) {
    res.status(401).json({ message: NOT_AUTHORIZED_MSG });
  }

  jwt.verify(token, SECRET, (error, decode) => {
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
