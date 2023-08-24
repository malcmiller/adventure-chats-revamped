import PlacesAutocomplete from "../../components/PlacesAutocomplete/PlacesAutocomplete";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import {
  FormGroup,
  FormControlLabel,
  Box,
  TextField,
  Switch,
  Button,
} from "@mui/material";

export default function EditAccountPage({ user, setUser }) {
  return (
    <>
      <h1>Account</h1>
      <Box component="form">
        <TextField helperText="Please enter your name" label="Name" />
        <ImageUpload />
        <PlacesAutocomplete />
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked={user.messagable ? true : false} />}
            label="Messagable"
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                defaultChecked={user.searchable ? true : false}
                color="secondary"
              />
            }
            label="Searchable"
          />
        </FormGroup>
        <Button variant="contained">Submit</Button>
      </Box>
    </>
  );
}
