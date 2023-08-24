import React from "react";
import CategoryCheckbox from "../CategoryCheckbox/CategoryCheckbox";
import ImageUpload from "../ImageUpload/ImageUpload"; 
import { useState } from "react";

import {
  Button,
  TextField,
  Container,
  Box,
  Typography,
} from "@mui/material";

function CreatePostForm({
  title,
  setTitle,
  content,
  setContent,
  images,
  setImages,
  handleSubmit,
  isLoading,
}) {
  const [location, setLocation] = useState({
    country: "",
    city: "",
    place: "",
  });

  
  const handleLocationChange = (field, value) => {
    setLocation((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h3" className="post-title" align="center">
        Create a New Post
      </Typography>
      <Container className="MuiContainer-root form-container">
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
          className="form-input"
        />

        <Box mt={2} mb={2}>
          <TextField
            label="Country"
            value={location.country}
            onChange={(e) =>
              handleLocationChange("country", e.target.value)
            }
            variant="outlined"
            size="small"
            fullWidth
            className="form-input"
          />

          <TextField
            label="City"
            value={location.city}
            onChange={(e) =>
              handleLocationChange("city", e.target.value)
            }
            variant="outlined"
            size="small"
            fullWidth
            className="form-input"
          />

          <TextField
            label="Place"
            value={location.place}
            onChange={(e) =>
              handleLocationChange("place", e.target.value)
            }
            variant="outlined"
            size="small"
            fullWidth
            className="form-input"
          />
        </Box>

        <label className="MuiFormLabel-root MuiInputLabel-root form-label">
          
        </label>
        <Container className="MuiContainer-root form-categories">
         
            <CategoryCheckbox
            />
      
        </Container>
     <Box mt={2} mb={2}>
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          className="form-input"
        />
      </Box>  
        <TextField
          label="Images"
          value={images}
          onChange={(e) => setImages(e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
          className="form-input"
        />
    
        <ImageUpload />

        <Box pb={2} className="MuiBox-root form-button-container">
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            className="form-button"
          >
            {isLoading ? "Creating..." : "Create Post"}
          </Button>
        </Box>
      </Container>
    </form>
  );
}

export default CreatePostForm;