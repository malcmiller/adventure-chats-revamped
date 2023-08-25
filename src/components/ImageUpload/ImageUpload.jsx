import { useState, useEffect } from "react";
import axios from "axios";
import axiosRequest from "../../utilities/send-request";
import { MuiFileInput } from "mui-file-input"; // https://viclafouch.github.io/mui-file-input/docs/getting-started/
import { token } from "morgan";
import {
  LinearProgress,
  Grid,
  Alert,
  Card,
  CardMedia,
  CardActions,
  Button,
  ImageList,
  ImageListItem,
} from "@mui/material/";

export default function ImageUpload({
  imageFor /*post || profile*/,
  id,
  getImageList,
}) {
  const [files, setFiles] = useState(null);
  const [progress, setProgress] = useState({
    started: false,
    percentageComplete: 0,
  });
  const [message, setMessage] = useState("No file selected");
  const [messageSeverity, setMessageSeverity] = useState("info");
  const [uploadedImages, setUploadedImages] = useState([]);

  const updateImagesAndList = (newImages) => {
    setUploadedImages(newImages);
    getImageList(newImages);
  };

  const getCurrentImageList = () => {
    return uploadedImages;
  };

  useEffect(() => {
    getImageList(getCurrentImageList());
  }, [uploadedImages]);

  const handleChange = (newFiles) => {
    setFiles(newFiles);
    setProgress({ started: false, percentageComplete: 0 });

    if (newFiles && newFiles.length === 0) {
      setMessage("No file selected");
      setMessageSeverity("info");
    }
  };

  useEffect(() => {
    if (files && files.length > 0) {
      handleUpload();
    }
  }, [files]);

  const handleUpload = () => {
    if (!files || files.length === 0) {
      setMessage("No file selected");
      setMessageSeverity("info");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(`file`, files[i]);
    }

    setMessage("Uploading...");
    setMessageSeverity("info");
    setProgress((prevState) => {
      return { ...prevState, started: true, percentageComplete: 0 };
    });

    axios
      .post(`/api/images/upload/${imageFor}/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        onUploadProgress: (progressEvent) => {
          setProgress((prevState) => {
            return {
              ...prevState,
              percentageComplete:
                (progressEvent.loaded / progressEvent.total) * 100,
            };
          });
        },
      })
      .then((res) => {
        const newImages = res.data.newImageArray.map((image) => ({
          url: image.url,
          _id: image._id,
        }));
        updateImagesAndList([...uploadedImages, ...newImages].reverse());
        setMessage("Upload successful");
        setMessageSeverity("success");
      })
      .catch((err) => {
        setMessage(
          "Upload failed: Please make sure image extensions are (.png | .jpg | .jpeg | .gif)"
        );
        setMessageSeverity("error");
        console.error(err);
      });
  };

  const handleDelete = (index, imageIdToRemove) => {
    const newFormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      if (i !== index) {
        newFormData.append(`file`, files[i]);
      }
    }
    setFiles(newFormData);

    axios
      .delete(`/api/images/${imageIdToRemove}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const newImages = [...uploadedImages];
        newImages.splice(index, 1);
        updateImagesAndList(newImages);
        setMessage("Deleted " + res.data.file);
        setMessageSeverity("success");
      })
      .catch((err) => {
        console.error("Error deleting image:", err);
        setMessageSeverity("error");
      });
  };

  return (
    <>
      <Grid sx={{ m: 1 }}>
        <MuiFileInput
          placeholder="Upload file(s)"
          value={files}
          onChange={handleChange}
          multiple
        />
      </Grid>
      <Grid sx={{ m: 1, width: "28rem" }}>
        {files && files.length > 0 && (
          <>
            {progress.started && (
              <LinearProgress
                variant="determinate"
                value={progress.percentageComplete}
              />
            )}
          </>
        )}
        {message && (
          <Alert severity={messageSeverity} sx={{ width: "29rem" }}>
            {message}
          </Alert>
        )}
      </Grid>

      {uploadedImages.length > 0 && (
        <ImageList sx={{ m: 1, width: 500, height: 250 }} cols={4}>
          {uploadedImages
            .slice()
            .reverse()
            .map((imageUrl, index) => (
              <ImageListItem key={index}>
                <Card raised={true}>
                  <CardMedia
                    component="img"
                    sx={{
                      objectFit: "contain",
                    }}
                    image={imageUrl.url}
                  />
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() =>
                        handleDelete(index, uploadedImages[index]._id)
                      }
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </ImageListItem>
            ))}
        </ImageList>
      )}
    </>
  );
}
