import React, { useState, useEffect } from "react";
import { useRef } from 'react';
import CreatePostForm from "../CreatePostForm/CreatePostForm";
import {  Container, Paper } from "@mui/material";
import * as categoriesAPI from '../../utilities/categories-api';


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
  const [activeCat, setActiveCat] = useState(null)
  const categoriesRef = useRef([]);

  useEffect(() => {
    async function getCategories() {
      try {
        const categories = await categoriesAPI.getAll();
        categoriesRef.current = categories;
        setCategories(categories); // Set the categories state
        setActiveCat(categoriesRef.current[0]?.name || ''); // Set activeCat to the first category name
      } catch (error) {
        console.error('Error fetching categories:', error);
      }

    
    }
    
    getCategories();
  }, []);

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
          activeCat={activeCat} // Pass activeCat as a prop
          setActiveCat={setActiveCat} // Pass setActiveCat as a prop
        />
        </Paper>
      </Container>
    </div>
  );
}

export default Post;




