import { useState } from "react";
import axios from "axios";

export default function ImageUpload() {
  const [files, setFiles] = useState();
  const [progress, setProgress] = useState({
    started: false,
    percentageComplete: 0,
  });
  const [message, setMessage] = useState();

  function handleUpload() {
    if (!files) {
      setMessage("No file selected");
      return;
    }
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(`file`, files[i]);
    }

    console.log(formData);

    setMessage("Uploading...");
    setProgress((prevState) => {
      return { ...prevState, started: true };
    });
    axios
      .post("http://localhost:3000/upload", formData, {
        onUploadProgress: (progressEvent) => {
          setProgress((prevState) => {
            return {
              ...prevState,
              percentageComplete: progressEvent.progress * 100,
            };
          });
        },
      })
      .then((res) => {
        setMessage("Upload successful");
        setProgress((prevState) => {
          return { ...prevState, started: true };
        });
        console.log(res.data);
      })
      .catch((err) => {
        setMessage("Upload failed");
        console.error(err);
      });
  }

  return (
    <>
      {/* <form action="/upload" method="POST" encType="multipart/form-data"> */}
      <input type="file" onChange={(e) => setFiles(e.target.files)} multiple />
      <button onClick={handleUpload}>Upload</button>
      <br />
      {progress.started && (
        <progress max="100" value={progress.percentageComplete}></progress>
      )}
      <br />
      {message && <span>{message}</span>}
      {/* </form> */}
    </>
  );
}
