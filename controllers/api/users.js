const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const Profile = require("../../models/profile");

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
  await Profile.findOne({ email: req.body.email })
    .then((profile) => {
      if (profile) {
        throw new Error("Account already exists");
      } else if (!process.env.SECRET) {
        throw new Error("no SECRET in .env file");
      } else {
        Profile.create(req.body).then((newProfile) => {
          req.body.profile = newProfile._id;
          User.create(req.body)
            .then((user) => {
              const token = createJWT(user);
              res.status(200).json(token);
            })
            .catch((err) => {
              Profile.findByIdAndDelete(newProfile._id);
              res.status(500).json({ err: err.errmsg });
            });
        });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
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
