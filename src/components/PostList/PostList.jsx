import React, { useState, useEffect } from "react";
import { getAll as getAllCategories } from "../../utilities/categories-api";

function PostList({ posts }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>

            <p>
              Categories:{" "}
              {post.categories.length > 0
                ? post.categories
                    .map((categoryId) => {
                      console.log("Looking for category with ID:", categoryId);
                      const categoryIdAsString = categoryId.toString(); // Convert ObjectId to string
                      const category = categories.find(
                        (cat) => cat._id === categoryIdAsString // Compare as strings
                      );
                      console.log("Found category:", category);
                      return category ? category.name : "Unknown Category";
                    })
                    .join(", ")
                : "No categories"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
