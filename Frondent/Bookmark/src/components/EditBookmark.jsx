
// eslint-disable-next-line no-unused-vars
import React, { useState , useEffect} from 'react'
import Modal from "react-modal";

import axios from 'axios'
import { toast } from 'react-toastify';


Modal.setAppElement('#root');

// eslint-disable-next-line react/prop-types
const EditBookMark = ({ modalIsOpen, closeModal,bookData,fetchBookmarks }) => {
  console.log(bookData);
  
  const [title,setTitle] = useState("")
  const [url,setUrl]= useState("")
  const [description,setDescription]= useState()

   useEffect(()=>{
     if(bookData){
      // eslint-disable-next-line react/prop-types
      setUrl(bookData.getBookMarkId.url)
      // eslint-disable-next-line react/prop-types
      setDescription(bookData.getBookMarkId.description)
            // eslint-disable-next-line react/prop-types
      setTitle(bookData.getBookMarkId.title)
     }
   },[bookData])
   




  const handleEditBook = async (id)=>{
    try {
      const response = await axios.put(`http://localhost:9000/api/Books/updateBookmark/${id}`,{ title,url,description } )
      console.log(response);
      closeModal()
      fetchBookmarks()
      toast.success('Bookmark Update successfully !')
    } catch (error) {
      console.log(error);
      toast.error('Failed to Edit Bookmark. Please try again.')
    }
  }
  


    

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={{
        content: {
          width: '90%',
          maxWidth: '400px',
          margin: 'auto',
          borderRadius: '10px',
          padding: '20px',
          inset: '50% auto auto 50%',
          transform: 'translate(-50%, -50%)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          zIndex: 1000,
        },
      }}
    >
      <h2 className="text-center text-lg sm:text-xl font-semibold mb-4 text-gray-800">
        Edit  Bookmark
      </h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

          <input
          type="text"
          placeholder='URL'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        <input
          type="text"
          placeholder='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
        />


      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={closeModal}
          className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:ring-2 focus:ring-gray-400"
        >
          Close
        </button>
        <button
          // eslint-disable-next-line react/prop-types
          onClick={() => handleEditBook(bookData.getBookMarkId._id)}
          className="p-2 bg-purple-500 text-white rounded hover:bg-purple-600 focus:ring-2 focus:ring-purple-400"
        >
          Edit
        </button>
      </div>
    </Modal>
  );
  
};

export default EditBookMark
