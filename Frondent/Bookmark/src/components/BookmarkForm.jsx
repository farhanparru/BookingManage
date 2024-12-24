// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const BookmarkForm = ({ selectedBookmark, fetchBookmarks }) => {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  

  const validate = () => {
    const errors = {};
    if (!formData.title) errors.title = "Title is required";
    if (!formData.url || !/^https?:\/\/.+\..+/.test(formData.url))
      errors.url = "URL must be valid";
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
       
    const response = await axios.post('http://localhost:9000/api/Books/createBookmark', formData)
     console.log(response);
     
      if (response.status === 200) {
        toast.success("Bookmark added!");
        fetchBookmarks(); // Fetch updated bookmarks
        setFormData({ title: "", url: "", description: "" }); // Clear form data
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to save bookmark. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md">
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          className={`border rounded-md p-2 w-full ${errors.title ? "border-red-500" : ""}`}
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">URL</label>
        <input
          type="url"
          className={`border rounded-md p-2 w-full ${errors.url ? "border-red-500" : ""}`}
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
        />
        {errors.url && <p className="text-red-500 text-sm">{errors.url}</p>}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Description (Optional)</label>
        <textarea
          className="border rounded-md p-2 w-full"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        {selectedBookmark ? "Update" : "Save"}
      </button>
    </form>
  );
};

export default BookmarkForm;
