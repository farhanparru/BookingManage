const express = require("express");
const router = express.Router();
const bookmarkCtrl = require('../controller/BookmarkCtrl')



router

.post('/createBookmark',bookmarkCtrl.createBookmark)
.get('/getBookMark',bookmarkCtrl.getBookMark)
.get('/getBookmark/:id',bookmarkCtrl.getBookmarkId)
.put('/updateBookmark/:id', bookmarkCtrl.updateBookmark)
.delete('/deleteBookmark/:id', bookmarkCtrl.deleteBookmark)




module.exports = router