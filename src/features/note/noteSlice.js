import { createSlice } from "@reduxjs/toolkit";

const fetchNotes = () => {
  try {
    const notes = JSON.parse(localStorage.getItem("notes"));
    return notes.length == 0
      ? [
          {
            id: "divyakumarpatel",
            title: "Hello",
            description: "Hello, Welcome to Notes App",
            color: "#93c5fd",
            date: "31/12/2022",
          },
        ]
      : notes;
  } catch (e) {
    return [];
  }
};

const noteSlice = createSlice({
  name: "note",
  initialState: {
    notes: fetchNotes(),
  },
  reducers: {
    addNote: (state, action) => {
      state.notes.push(...action.payload);
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    updateNote: (state, action) => {
      const { id, title, description, date, color } = action.payload;
      const note = state.notes.find((note) => note.id === id);
      if (note) {
        note.title = title;
        note.description = description;
        note.date = date;
        note.color = color;
      }
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
  },
});

export const { addNote, deleteNote, updateNote } = noteSlice.actions;
export default noteSlice.reducer;
