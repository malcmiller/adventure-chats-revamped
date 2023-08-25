import PlacesAutocomplete from "../PlacesAutocomplete/PlacesAutocomplete";
import ImageUpload from "../ImageUpload/ImageUpload";
import { getById, create } from "../../utilities/profiles-api";

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
} from "@mui/material/";

export default function EditProfileSettingsForm({ user }) {
  const navigate = useNavigate();

  const [message, setMessage] = useState([""]);

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getById(user.profileId); // Replace with your API endpoint
      console.log(response.data);
      setFormData(response.data);
      setSlidersState(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching visits:", error);
    }
  };

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

  const handleSliderChange = (event) => {
    setSlidersState({
      ...slidersState,
      [event.target.name]: event.target.checked,
    });
  };

  const [locationData, setLocationData] = useState({
    googlePlaceId: "",
    placeName: "",
  });

  useEffect(() => {
    // const databaseData = fetchFromDatabase();

    // Update the state with the database values
    setFormData({
      profilePic: [],
      firstName: "",
      lastName: "",
      googlePlaceId: "",
      placeName: "",
    });
  }, []);

  const handleChange = (e) => {
    updateMessage("");
    setFormData({
      ...formData,
      googlePlaceId: locationData.googlePlaceId,
      placeName: locationData.placeName,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const user = await signUp(formData);
      // props.setUser(user);
      // navigate(-1);
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
      <ImageUpload
        imageFor={"profile"}
        id={user.profileId}
        getImageList={(imageList) => {
          setFormData({
            ...formData,
            profilePic: imageList.map((image) => image._id),
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
