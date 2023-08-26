import EditProfileSettingsForm from "../../components/EditProfileSettingsForm/EditProfileSettingsForm";
import {
  FormGroup,
  FormControlLabel,
  Box,
  TextField,
  Switch,
  Button,
} from "@mui/material";

export default function SettingsPage({ user }) {
  return (
    <>
      <h1>Settings</h1>
      <EditProfileSettingsForm user={user} />
    </>
  );
}
