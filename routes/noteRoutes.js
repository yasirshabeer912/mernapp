const express = require('express');
const { getNotes,createNote,updateNote,getNodeById,deleteNote } = require('../controllers/notesController');
const router = express.Router()
const {protect} = require('../middlewares/authMiddleware')

// const noteController = require('../controllers/notesController')/
router.route('/').get(protect,getNotes)
router.route('/create').post(protect,createNote)
router.route('/:id').get(getNodeById).put(protect,updateNote).delete(deleteNote)

module.exports = router