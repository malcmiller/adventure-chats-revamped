import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../utilities/users-service";
import {
  Box,
  Grid,
  FormControl,
  TextField,
  Button,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material/";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SignUpForm = (props) => {
  const navigate = useNavigate();

  const [message, setMessage] = useState([""]);

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [showConfPassword, setShowConfPassword] = useState(false);

  const handleClickShowConfPassword = () => {
    setShowConfPassword(!showConfPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    passwordConf: "",
  });

  const handleChange = (e) => {
    updateMessage("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(formData);
      props.setUser();
      navigate(-1);
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { username, firstname, lastname, email, password, passwordConf } =
    formData;

  const isFormInvalid = () => {
    return !(
      username &&
      firstname &&
      lastname &&
      email &&
      password &&
      password === passwordConf
    );
  };

  return (
    <Box component="form" autoComplete="off" onSubmit={handleSubmit}>
      <Grid>
        <TextField
          fullWidth
          name="username"
          autoComplete="username"
          label="Username"
          multiline
          maxRows={4}
          value={username}
          onChange={handleChange}
          sx={{ m: 1, width: "35ch" }}
        />
      </Grid>
      <TextField
        fullWidth
        name="firstname"
        autoComplete="firstname"
        label="First name"
        multiline
        maxRows={4}
        value={firstname}
        onChange={handleChange}
        sx={{ m: 1, width: "30ch" }}
      />
      <TextField
        fullWidth
        name="lastname"
        autoComplete="lastname"
        label="Last name"
        multiline
        maxRows={4}
        value={lastname}
        onChange={handleChange}
        sx={{ m: 1, width: "30ch" }}
      />
      <Grid>
        <TextField
          fullWidth
          name="email"
          type={"email"}
          autoComplete="email"
          label="Email"
          multiline
          maxRows={4}
          value={email}
          onChange={handleChange}
          sx={{ m: 1, width: "70ch" }}
        />
      </Grid>
      <div>
        <FormControl fullWidth sx={{ width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-password">Password</InputLabel>
          <OutlinedInput
            name="password"
            id="outlined-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            sx={{ m: 1, width: "50ch" }}
          />
        </FormControl>
      </div>
      <div>
        <FormControl fullWidth sx={{ width: "100%" }} variant="outlined">
          <InputLabel htmlFor="outlined-passwordConf">
            Password Confirmation
          </InputLabel>
          <OutlinedInput
            name="passwordConf"
            id="outlined-passwordConf"
            type={showConfPassword ? "text" : "password"}
            value={passwordConf}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password Confirmation"
            sx={{ m: 1, width: "50ch" }}
          />
        </FormControl>
      </div>
      <div>
        <Button
          type="submit"
          variant="contained"
          disabled={isFormInvalid()}
          sx={{ m: 1, width: "35ch" }}
        >
          Sign Up
        </Button>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button sx={{ m: 1, width: "35ch" }}>Cancel</Button>
        </Link>
      </div>
      <Grid>{message}</Grid>
    </Box>
  );
};

export default SignUpForm;
