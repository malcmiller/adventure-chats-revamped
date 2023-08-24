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
    return res.status(200).json(updatedProfile);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function show(req, res) {
  try {
    const profile = await Profile.findById(req.params.id);
    // .populate("joined_groups")
    // .populate("favorited_posts")
    // .populate("registered_events")
    // .populate("groups")
    // .populate("posts");
    return res.status(200).json(profile);
  } catch (err) {
    return res.status(500).json(err);
  }
}

