import React, { useState, useEffect } from "react";
import { getAll } from "../../utilities/categories-api"

export default function CategoryCheckbox({ activeCat, setActiveCat }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const fetchedCategories = await getAll();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  const cats = categories.map(category => (
    <li
      key={category._id}
      className={category._id === activeCat ? 'active' : ''}
      onClick={() => setActiveCat(category._id)}
    >
      {category.name}
    </li>
  ));

  return (
    <ul className="CategoryList">
      {cats}
    </ul>
  );
}