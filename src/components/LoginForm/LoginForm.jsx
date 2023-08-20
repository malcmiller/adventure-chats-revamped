import { useState } from "react";
import * as usersService from "../../utilities/users-service";
import axios from "axios";

export default function LoginForm({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  }

  async function handleSubmit(evt) {
    // Prevent form from being submitted to the server
    evt.preventDefault();
    try {
      // The promise returned by the signUp service method
      // will resolve to the user object included in the
      // payload of the JSON Web Token (JWT)
      const user = await usersService.login(credentials);
      setUser(user);
    } catch {
      setError("Log In Failed - Try Again");
    }
  }

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
        headers: {
          "Custom-Header": "value",
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
    <div>
      {/* <form action="/upload" method="POST" encType="multipart/form-data"> */}
      <input type="file" onChange={(e) => setFiles(e.target.files)} multiple />
      <button onClick={handleUpload}>Share</button>
      {progress.started && (
        <progress max="100" value={progress.percentageComplete}></progress>
      )}
      {message && <span>{message}</span>}
      {/* </form> */}
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit">LOG IN</button>
        </form>
      </div>
      <p className="error-message">&nbsp;{error}</p>
    </div>
  );
}
