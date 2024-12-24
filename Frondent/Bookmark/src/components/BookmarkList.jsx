// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import EditBookMark from "./EditBookmark";
import axios from 'axios'
import { toast } from "react-toastify";
// eslint-disable-next-line react/prop-types
const BookmarkList = ({ bookmarks ,fetchBookmarks}) => {
   

  const [BookmarkEditModalIsOpen, setBookmarkEditModalIsOpen] = useState(false);
  const [EdiTbook, setEditbook] = useState(null);
  
  
    
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("title");

  const fetchBookmarkId = async (id) => {
    
    try {
      const response = await axios.get(
        `http://localhost:9000/api/Books/getBookmark/${id}`
      );
      setEditbook(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to Fetch task. Please try again.");
    }
  };


  const handleDelete =   async(id) => {
   
    try {
        const response = await axios.delete(`http://localhost:9000/api/Books/deleteBookmark/${id}`)
        console.log(response);
        fetchBookmarks()
        toast.success('Successfully deleted')
    } catch (error) {
        console.log(error);
        
    }
  };


const openBookeditModal = async (id) => {
    await fetchBookmarkId(id);
    setBookmarkEditModalIsOpen(true);
  };

  const closeBookmarkeditModal = () => {
    setBookmarkEditModalIsOpen(false);
    setEditbook(null); // clear selcted data
  };

  


  const filteredBookmarks = bookmarks
    // eslint-disable-next-line react/prop-types
    .filter((bookmark) =>
      bookmark.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (a[sort] > b[sort] ? 1 : -1));



  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search bookmarks..."
          className="border rounded-md p-2 w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border rounded-md p-2"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="title">Sort by Title</option>
          <option value="date">Sort by Date</option>
        </select>
      </div>
      <ul>
        {filteredBookmarks.map((bookmark) => (
          <li
            key={bookmark.id}
            className="flex justify-between items-center p-4 border-b"
          >
            <div>
              <h3 className="text-lg font-semibold">{bookmark.title}</h3>
              <p className="text-sm text-gray-500">{bookmark.description}</p>
              <a
               
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {bookmark.url}
              </a>
            </div>
            <div>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                onClick={() => openBookeditModal(bookmark._id)}
              >
                Edit
              
              </button>
              <button
              
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={() => handleDelete(bookmark._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <EditBookMark
        modalIsOpen={BookmarkEditModalIsOpen}
        closeModal={closeBookmarkeditModal}
        bookData={EdiTbook}
        fetchBookmarks={fetchBookmarks}
      />
    </div>
  );
};

export default BookmarkList;
