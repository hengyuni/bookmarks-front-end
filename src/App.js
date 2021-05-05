import React, { useState, useEffect } from 'react';
import './App.css';
import BookmarksList from './Components/BookmarksList';

export const DataContext = React.createContext();


function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  
  /* AUTHENTICATION */
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  })
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/bookmarks', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({...loginForm})
      });
      const data = await response.json();
      if (data.token) {
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("username", data.username);
        setLoggedIn(true);
      }
    } catch (error) {
      console.error(error)
    }
  };
  const handleLogout = () => {
    window.localStorage.clear();
    setLoggedIn(false);
  };
  
  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.id]: e.target.value })
  };
  
  /* END AUTHENTICATION */

// read
  const getAllBookmarks = async () => {
    try {
      const result = await fetch('http://localhost:8000/bookmarks');
      const data = await result.json();
      setBookmarks(data);
    } catch (err) {
      console.log(err);
    }
  }
// create
  const createBookmark = async () => {
    const body = {
      title,
      url
    }
    try {
      const res = await fetch('http://localhost:8000/bookmarks', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
      setTitle("");
      setUrl("");
    } catch (err) {
      console.log(err);
    } finally {
      await getAllBookmarks();
    }

  }
// delete
  const deleteBookmark = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/bookmarks/${id}`, {
        method: "DELETE"
      })
    } catch (err) {
      console.log(err);
    } finally {
      await getAllBookmarks();
    }
  }

// update
  const updatedBookmark = async (data, id) => {
    try {
      const response = await fetch(`http://localhost:8000/bookmarks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
    } catch (err) {
      console.log(err);
    } finally {
      await getAllBookmarks();
    }
  }


  const onSubmit = (e) => {
    e.preventDefault();
    createBookmark();
  }

  const onTitleChange = (e) => setTitle(e.target.value);

  const onURLChange = (e) => setUrl(e.target.value);


  useEffect(() => {
    getAllBookmarks();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true)
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      getAllBookmarks();
    }
  }, [isLoggedIn]);

  return (
    <DataContext.Provider value={{
      deleteBookmark,
      updatedBookmark
    }}>
      <h1>My Bookmarks App</h1>
      <h3>you're logged in</h3>
      <button onCLick={handleLogout}>Log out</button>
      <br />
      <form onSubmit={onSubmit}>
        <input type="text" id="title" placeholder="title" onChange={onTitleChange} value={title} />
        <input type="text" id="url" placeholder="url" onChange={onURLChange} value={url} />
        <input type="submit" />
      </form>
      <BookmarksList data={bookmarks} />
    </DataContext.Provider>
  );
}

export default App;

