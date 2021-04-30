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
          ></input>{" "}
        </label>
        <br />
        <label>
          Tags: {" "}
          <input
            type="text"
            id="url"
            value={formData.tags}
            onChange={handleChange}
            placeholder={"enter tags..."}
          ></input>{" "}
        </label>
        <br />
        <input type="submit"></input>
      </form>

      {bookmarks.map((bookmark) => {
        return (
          <div key={bookmark._id}>
            <h3>{bookmark.title}</h3>
            <p>
              {" "}
              You've bookmark'd {bookmark.title} with the tags: {" "} 
              {bookmark.tags.length > 0 ? `${bookmark.tags}${" "}` : "no tags inputed yet"}
            </p>
            <button 
              onClick={(e) => {
                deleteBookmark(e, bookmark._id);
              }}
            >{`DELETE ${bookmark.title.toUpperCase()}`}</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;

