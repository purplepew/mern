import apiSlice from "../../app/api/apiSlice"
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"

const notesAdapter = createEntityAdapter()
const initialState = notesAdapter.getInitialState()

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotes: builder.query({
            query: () => '/notes',
            transformResponse: responseData => {
                const loadedData = responseData.map(note => {
                    note.id = note._id
                    return note
                })
                return notesAdapter.setAll(initialState, loadedData)
            }
        })
    })
})

export const { useGetNotesQuery } = notesApiSlice
