import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import './App.css';



function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    tags: []
  });

  // create
  const createBookmark = async (e) => {
    e.preventDefault();
    const body = { ...formData };
    try {
      const res = await fetch("http://localhost:8000/bookmarks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      setFormData({
        title: "",
        url: "",
        tags: []
      });
    } catch (err) {
      console.log(err); 
    } finally {
      await getBookmarks();
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  };

  // Read
  const getBookmarks = async () => {
    try {
      const res = await fetch("http://localhost:8000/bookmarks/");
      const data = await res.json();
      setBookmarks([...data])
    } catch (err) {
      console.log(err);
    }
  }

  // Update
  const updateBookmark = async (e, id) => {
    try {
      const res = await fetch(`http://localhost:8000/bookmarks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify
      });
      const data = await Response.json()
    } catch (err) {
      console.log(err);
    } finally {
      await getBookmarks();
    }
  };

  // Delete
  const deleteBookmark = async (e, id) => {
    try {
      const response = await fetch(`http://localhost:8000/bookmarks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      await getBookmarks();
    }
  };

  // useEffect
  useEffect(() => {
    getBookmarks();
  }, []);
  

  return (
    <div className="App">
      <h1>Bookmark'd</h1>
      <form onSubmit={createBookmark}>
        <h3>Bookmark Below</h3>
        <label>
          Title: {" "}
          <input 
            type="text"
            id="title"
            value={formData.title}
            onChange={handleChange}
            placeholder={"enter site name..."}
          ></input>{" "}
        </label>
        <br />
        <label>
          url: {" "}
          <input
            type="text"
            id="url"
            value={formData.url}
            onChange={handleChange}
            placeholder={"https://"}
          ></input>
        </label>
      </form>
    </div>
  );
}

export default App;
