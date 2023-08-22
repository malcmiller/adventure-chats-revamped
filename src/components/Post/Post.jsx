import React, { useState, useEffect } from "react";
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import {  Container, Paper } from "@mui/material";

function Post() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [locationCountry, setLocationCountry] = useState(""); // Define locationCountry state
  const [locationCity, setLocationCity] = useState(""); // Define locationCity state
  const [locationPlace, setLocationPlace] = useState(""); // Define locationPlace state

  const [images, setImages] = useState(""); // Define images state
  useEffect(() => {
    // Fetch categories from the backend and update the state
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories"); // Adjust the endpoint
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
  
    const newPost = {
      title,
      content,
      location: { country: locationCountry, city: locationCity, place: locationPlace },
      categories: selectedCategories,
      images: images, 
    };
  
    try {
      await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
  
      // reset the form fields here
      setTitle("");
      setContent("");
      setLocationCountry("");
      setLocationCity("");
      setLocationPlace("");
      setSelectedCategories([]);
      setImages("");
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
          locationCountry={locationCountry}
          setLocationCountry={setLocationCountry}
          locationCity={locationCity}
          setLocationCity={setLocationCity}
          locationPlace={locationPlace}
          setLocationPlace={setLocationPlace}
          content={content}
          setContent={setContent}
          categories={categories}
          selectedCategories={selectedCategories}
          handleCategoryChange={handleCategoryChange}
          images={images}
          setImages={setImages}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
        </Paper>
      </Container>
    </div>
  );
}

export default Post;