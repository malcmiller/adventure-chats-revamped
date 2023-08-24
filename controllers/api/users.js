const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const Profile = require("../../models/profile");
const Location = require("../../models/location");

module.exports = {
  create,
  login,
  checkToken,
};

function checkToken(req, res) {
  console.log("req.user", req.user);
  res.json(req.exp);
}

async function create(req, res) {
  const user = await User.findOne({ email: req.body.email });
  const profile = await Profile.findOne({ username: req.body.username });

  if (user) {
    res.status(500).json({ error: "Email already in use." });
  } else if (profile) {
    res.status(500).json({ error: "Username not available." });
  } else {
    Location.create(req.body).then((newLocation) => {
      req.body.homeBase = newLocation._id;
      Profile.create(req.body).then((newProfile) => {
        req.body.profile = newProfile._id;
        User.create(req.body)
          .then((user) => {
            const token = createJWT(user);
            res.status(200).json(token);
          })
          .catch((err) => {
            Location.findByIdAndDelete(newLocation._id);
            Profile.findByIdAndDelete(newProfile._id);
            res.status(500).json({ err: err.errmsg });
          });
      });
    });
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json("Bad Credentials");
  }
}

/*--- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}
