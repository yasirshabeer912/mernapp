const expressAsyncHandler = require('express-async-handler')
const Note = require('../models/noteModel')
const getNotes = expressAsyncHandler(async (req, res) => {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes)
})

const getNodeById = expressAsyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }

  res.json(note);
})


const createNote = expressAsyncHandler(async (req, res) => {
    const { title, content, category } = req.body

    if (!title || !category || !content) {
        res.status(401).json({ message: 'Please Fill All the Fields' })
    } else {
        const newNote = new Note({ user: req.user._id, title, content, category })
        const note = await newNote.save();

        res.status(201).json({ message: 'Note Created Successfully', payload: note })
    }
})

const updateNote = expressAsyncHandler(async (req, res) => {
    const { title, content, category } = req.body;
    const noteId = req.params.id;

    // First, check if the note exists using findById
    const note = await Note.findById(noteId);

    if (!note) {
        return res.status(404).json({ message: 'Note Not Found' });
    }

    // Then, check if the note's user matches the current user
    if (note.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'This is Not Your Note' });
    }

    // Update the note
    note.title = title;
    note.content = content;
    note.category = category;

    const updatedNote = await note.save();
    res.json({ message: 'Note Updated Successfully', payload: updatedNote });
});

const deleteNote = expressAsyncHandler(async (req,res)=>{
    const noteId=req.params.id;
    const note= await Note.findById(noteId)
    if(note){
        await note.deleteOne();
        res.json({message:'Note Deleted Successfully'})
    }
    else{
        res.json({message:'Note Not Found'})
    }
})

module.exports = { getNotes, createNote, getNodeById, updateNote,deleteNote }