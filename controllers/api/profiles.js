const Profile = require("../../models/profile");

module.exports = {
  index,
  update,
  show,
};

function index(req, res) {
  Profile.find({})
    .then((profiles) => res.json(profiles))
    .catch((err) => {
      res.status(500).json(err);
    });
}
async function update(req, res) {
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    const updatedLocation = await Location.findByIdAndUpdate();
    return res.status(200).json(updatedProfile);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function show(req, res) {
  try {
    const profile = await Profile.findById(req.params.id)
      .populate("profilePics")
      .populate("homeBase");
    console.log(profile);
    return res.status(200).json(profile);
  } catch (err) {
    return res.status(500).json(err);
  }
}
