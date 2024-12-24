// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import BookmarkList from "./components/BookmarkList";
import BookmarkForm from "./components/BookmarkForm";
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [bookmarks, setBookmarks] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedBookmark, setSelectedBookmark] = useState(null);
 


  const fetchBookmarks = async () => {
    try {
      const response = await axios.get("http://localhost:9000/api/Books/getBookMark");
      setBookmarks(response.data.AllgetBookmark); 
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  useEffect(() => {
  fetchBookmarks();
}, []);


 

 

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bookmark Manager</h1>
      <BookmarkForm
        selectedBookmark={selectedBookmark}
        fetchBookmarks={fetchBookmarks}
      />
      <BookmarkList
        bookmarks={bookmarks}
        fetchBookmarks={fetchBookmarks}
      />
      <ToastContainer/>
    </div>
  );
};

export default App;
