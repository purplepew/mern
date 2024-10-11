import Note from '../models/Note.js'
import AsyncHandler from 'express-async-handler'

export const getAllNotes = AsyncHandler( async(req, res) => {
    const notes = await Note.find().lean()
    if(!notes?.length){
        return res.status(404).json({message: 'No notes found'})
    }   
     
    res.status(200).json(notes)
})
