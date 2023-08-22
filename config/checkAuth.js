module.exports = function(req, res, next) {
  return req.user ? next() : res.status(401).json({ msg: "Not Authorized" });
}