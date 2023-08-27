import React, { useEffect, useState } from "react";
import { getAll, create,  } from "../../utilities/visits-api"

export default function VisitPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [visits, setVisits] = useState([]);

 useEffect(() => {
    fetchVisits();
  }, []);


  const fetchVisits = async () => {
    try {
      const response = await getAll(); // Replace with your API endpoint
      setVisits(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching visits:", error);
    }
  };
  

  const addVisit = async (e) => {
    e.preventDefault();

    const newVisit = {
      title,
      description,
      startDate,
      endDate,
      location,
    };

    try {
      const response = await create(newVisit);
      console.log(response);
      console.log("Visit added:", response.data);

      // Clear form fields after successful submission
      setTitle("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setLocation("");

      // Fetch updated visits after adding a new visit
      fetchVisits();
    } catch (error) {
      console.error("Error adding visit:", error);
    }
  };

  return (
    <div>
      <h2>Add a Visit</h2>
      <form onSubmit={addVisit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button type="submit">Add Visit</button>
      </form>

      <div>
        <h2>Added Visits</h2>
        <ul>
          {visits.map((visit) => (
            <li key={visit._id}>
              <p>Title: {visit.title}</p>
              <p>Description: {visit.description}</p>
              <p>Start Date: {visit.startDate}</p>
              <p>End Date: {visit.endDate}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

