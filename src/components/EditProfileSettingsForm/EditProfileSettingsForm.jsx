import PlacesAutocomplete from "../PlacesAutocomplete/PlacesAutocomplete";
import ImageUpload from "../ImageUpload/ImageUpload";
import { getById, update } from "../../utilities/profiles-api";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  TextField,
  Button,
  Alert,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material/";

export default function EditProfileSettingsForm({ user }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState([""]);
  const [profilePicList, setProfilePicList] = useState([]);
  const [hasLocation, setHasLocation] = useState(true);

  const [formData, setFormData] = useState({
    profilePic: [],
    firstName: "",
    lastName: "",
    googlePlaceId: "",
    placeName: "",
  });

  const [slidersState, setSlidersState] = useState({
    useUsername: true,
    isMessageable: true,
    isSearchable: true,
  });

  const [locationData, setLocationData] = useState({
    googlePlaceId: "",
    placeName: "",
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getById(user.profile._id); // Replace with your API endpoint
      console.log(response.data);

      setProfilePicList(response.data.profilePics.reverse());

      setFormData(response.data);
      setLocationData({
        googlePlaceId: response.data.homeBase.googlePlaceId,
        placeName: response.data.homeBase.placeName,
      });
      setSlidersState(response.data);
    } catch (error) {
      console.error("Error fetching profile: ", error);
    }
  };

  const handleSliderChange = (event) => {
    setSlidersState({
      ...slidersState,
      [event.target.name]: event.target.checked,
    });
  };

  const handleChange = (e) => {
    updateMessage("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    // Check if locationData has changed
    if (
      locationData.googlePlaceId !== formData.googlePlaceId ||
      locationData.placeName !== formData.placeName
    ) {
      setFormData({
        ...formData,
        googlePlaceId: locationData.googlePlaceId,
        placeName: locationData.placeName,
      });
    }
  }, [locationData]);

  useEffect(() => {
    setFormData({
      ...formData,
      googlePlaceId: locationData.googlePlaceId,
      placeName: locationData.placeName,
      newProfilePicList: profilePicList,
    });
  }, [profilePicList]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const profile = await update(user.profile._id, formData);
      console.log(profile);
    } catch (err) {
      updateMessage(err.response.data.error);
    }
  };

  const { firstName, lastName } = formData;

  const isFormInvalid = () => {
    return !(firstName && lastName);
  };

  return (
    <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
      <Typography sx={{ m: 1 }} variant="button" display="block" gutterBottom>
        Profile Picture Upload
      </Typography>
      <ImageUpload
        imageFor={"profile"}
        id={user.profile._id}
        profilePicList={profilePicList}
        setProfilePicList={setProfilePicList}
        getImageList={(imageList) => {
          setFormData({
            ...formData,
            profilePicsNew: imageList.map((image) => image._id),
          });
        }}
      />
      <TextField
        fullWidth
        name="firstName"
        autoComplete="given-name"
        label="First name"
        multiline
        maxRows={4}
        value={firstName}
        onChange={handleChange}
        sx={{ m: 1, width: "30ch" }}
      />
      <TextField
        fullWidth
        name="lastName"
        autoComplete="family-name"
        label="Last name"
        multiline
        maxRows={4}
        value={lastName}
        onChange={handleChange}
        sx={{ m: 1, width: "30ch" }}
      />
      <Grid sx={{ m: 1 }}>
        <PlacesAutocomplete
          locationData={locationData}
          setLocationData={setLocationData}
          hasLocation={hasLocation}
          setHasLocation={setHasLocation}
        />
      </Grid>
      <Grid sx={{ m: 1 }}>
        <FormControlLabel
          control={
            <Switch
              checked={slidersState.useUsername}
              onChange={handleSliderChange}
              name="useUsername"
            />
          }
          label="Use Username"
        />
      </Grid>
      <Grid sx={{ m: 1 }}>
        <FormControlLabel
          control={
            <Switch
              checked={slidersState.isMessageable}
              onChange={handleSliderChange}
              name="isMessageable"
              color="secondary"
            />
          }
          label="Message with others"
        />
      </Grid>
      <Grid sx={{ m: 1 }}>
        <FormControlLabel
          control={
            <Switch
              checked={slidersState.isSearchable}
              onChange={handleSliderChange}
              name="isSearchable"
              color="warning"
            />
          }
          label="Public posts"
        />
      </Grid>
      <div>
        <Button
          type="submit"
          variant="contained"
          disabled={isFormInvalid()}
          sx={{ m: 1, width: "35ch" }}
        >
          Update
        </Button>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button sx={{ m: 1, width: "35ch" }}>Cancel</Button>
        </Link>
      </div>

      {message != "" ? (
        <Alert severity="error" sx={{ m: 1, width: "70ch" }}>
          {message}
        </Alert>
      ) : (
        ""
      )}
    </Box>
  );
}
