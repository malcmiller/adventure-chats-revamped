import { useState, useEffect, useRef } from 'react';


import { Routes, Route } from "react-router-dom";
import { getUser } from "../../utilities/users-service";

import HomePage from "../HomePage/HomePage";
import AuthPage from "../AuthPage/AuthPage";

import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import NavBar from "../../components/NavBar/NavBar";

import * as categoriesAPI from '../../utilities/categories-api';


export default function NewOrderPage() {
  const [user, setUser] = useState(getUser());
  const [activeCat, setActiveCat] = useState('');
  const categoriesRef = useRef([]);
  useEffect(() => {
    async function getCategories() {
      try {
        const categories = await categoriesAPI.getAll();
        categoriesRef.current = categories;
        console.log(categories)
        setActiveCat(categoriesRef.current[0]?.name || ''); // Set activeCat to the first category name
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    getCategories();
  }, []);

  return (
    
    <main className="App">
      
     
      <NavBar user={user} setUser={setUser} />
      <div className="content-container">
      <Routes>
          {user ? (
            <>
              {/* Route components for authenticated user */}
              <Route path="/" element={<HomePage />} />
              <Route path="/orders/new" element={<NewOrderPage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
            </>
          ) : (
            <>
              {/* Route components for guest user */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<AuthPage setUser={setUser} />} />
            </>
          )}
        </Routes>
      </div>
    </main>
  );
}
