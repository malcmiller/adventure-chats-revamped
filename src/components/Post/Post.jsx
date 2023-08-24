import React, { useState } from "react";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import { Container, Paper } from "@mui/material";

function Post() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [locationData, setLocationData] = useState({
    googlePlaceId: "",
    placeName: "",
  });
  const [images, setImages] = useState("");
  const [activeCat, setActiveCat] = useState(null);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const newPost = new FormData();
    newPost.append("title", title);
    newPost.append("content", content);
    newPost.append("location", JSON.stringify(locationData));
    selectedCategories.forEach((categoryId) => {
      newPost.append("categories", categoryId);
    });

    // Append selected images to FormData
    for (let i = 0; i < images.length; i++) {
      newPost.append("images", images[i]);
    }

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: newPost,
      });

      // reset the form fields here
      setTitle("");
      setContent("");
      setLocationData({
        googlePlaceId: "",
        placeName: "",
      });
      setSelectedCategories([]);
      setImages([]);
    } catch (error) {
      console.error("Error creating post:", error);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <Container maxWidth="md" className="post-container">
        <Paper elevation={3} className="card">
          <CreatePostForm
            title={title}
            setTitle={setTitle}
            locationData={locationData}
            setLocationData={setLocationData}
            content={content}
            setContent={setContent}
            selectedCategories={selectedCategories}
            handleCategoryChange={handleCategoryChange}
            images={images}
            setImages={setImages}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            activeCat={activeCat}
            setActiveCat={setActiveCat}
          />
        </Paper>
      </Container>
    </div>
  );
}

export default Post;
