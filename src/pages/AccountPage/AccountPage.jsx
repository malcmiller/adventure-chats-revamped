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

export default function AccountPage() {
  return (
    <>
      <h1>Account</h1>
      <Box component="form">
        <TextField helperText="Please enter your name" label="Name" />
        <ImageUpload />
        <TextField helperText="Please enter your email" label="Email" />
        <PlacesAutocomplete />
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="Messagable"
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked color="secondary" />}
            label="Searchable"
          />
        </FormGroup>
        <Button variant="contained">Submit</Button>
      </Box>
    </>
  );
}
