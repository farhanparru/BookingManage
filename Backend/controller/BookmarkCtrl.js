const Bookmark = require("../Model/BookmarkModel");

module.exports = {
  createBookmark: async (req, res) => { 
    const { url, title, description } = req.body;
    console.log(req.body,"req.body");
    try {

      const newBookmark = await new Bookmark({
        url,
        title,
        description,
      });

      console.log(newBookmark,"newBookmark");
      
      const savedBookmark = newBookmark.save();

      return res
        .status(200)
        .json({ message: "Successfully created Bookmark", savedBookmark });
    } catch (error) {
      return res.status(500).json({ message: "Internel server Error" });
    }
  },

  getBookMark: async (req, res) => {
    try {
      const AllgetBookmark = await Bookmark.find();
      return res
        .status(201)
        .json({ message: "All bookMark data fetching", AllgetBookmark });
    } catch (error) {
      return res.status(500).json({ messaeg: "Error fetching Data" });
    }
  },

  getBookmarkId:async(req,res)=>{
     try {
        const {id} = req.params
        const getBookMarkId = await Bookmark.findById(id)
        return res.status(200).json({message:"Successfuly fetching Data Bookmark",getBookMarkId })
     } catch (error) {
        return res.status(500).json({messaeg:"Error fething data"})
     }
  },

  updateBookmark:async(req,res)=>{
    try {
        const {Url, title, description} = req.body
        const {id} = req.params

        const bookmarkUp = await Bookmark.findById(id)

        if(!bookmarkUp){
            return res.status(404).json({messaeg:"Bookmark Note found"})
        }

        bookmarkUp.Url = Url || bookmarkUp.Url
        bookmarkUp.title = title || bookmarkUp.title
        bookmarkUp.description = description || bookmarkUp.description

        const  updateBookmark = await bookmarkUp.save()
        return res.status(201).json({message:"Update successfulyBookmark",updateBookmark })
    } catch (error) {
       return res.status(500).json({messaeg:"Failed updated Bookmark"}) 
    }
  },

  deleteBookmark:async(req,res)=>{
    try {
        const {id} = req.params
        const deleteBookmark = await Bookmark.findByIdAndDelete(id)
        return res.status(200).json({message:"Successfully deleted Bookmark",deleteBookmark })
    } catch (error) {
        return res.status(500).json({messaeg:"Failed To delete Bookmark"})
    }
  }
};
