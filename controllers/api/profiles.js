const Profile = require("../../models/profile");
const Location = require("../../models/location");

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
    console.log(req.body);
    if (req.body.googlePlaceId) {
      const location = await Location.findOne({
        googlePlaceId: req.body.googlePlaceId,
      });
      if (!location) {
        const newLocation = await Location.create(req.body);
        req.body.homeBase = newLocation._id;
      } else {
        req.body.homeBase = location._id;
      }
    } else {
      req.body.homeBase = null;
    }
    console.log(req.body.homeBase);

    let updatedProfilePics;
    const existingProfilePics = req.body.profilePics || [];
    if (req.body.profilePicsNew) {
      const newProfilePicIds = req.body.profilePicsNew || [];

      updatedProfilePics = existingProfilePics.concat(newProfilePicIds);
    }

    // logic for when exisiting list of image is being modified
    req.body.newProfilePicList;

    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        homeBase: req.body.homeBase,
        profilePics: updatedProfilePics,
      },
      { new: true }
    );
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
    return res.status(200).json(profile);
  } catch (err) {
    return res.status(500).json(err);
  }
}
