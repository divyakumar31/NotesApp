import React, { useState } from "react";
import { Note, NoteInput } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { deleteNote } from "./features/note/noteSlice";

const App = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);

  const [updateData, setUpdateData] = useState({ id: null });

  return (
    <>
      <div className="flex flex-col-reverse xsm:grid xsm:grid-cols-3 lg:grid-cols-4">
        <div className="bg-slate-800 text-white sm:col-span-1 p-2 xsm:p-5 h-screen max-h-screen overflow-y-scroll scrollbar-none">
          <h1 className="hidden xsm:block text-4xl font-semibold">Notes</h1>
          <h1 className="xsm:hidden text-4xl font-semibold">Your Notes</h1>
          <div className="mt-5 flex flex-col-reverse gap-4 overflow-hidden scrollbar-none">
            {notes.map((note) => (
              <Note
                key={note.id}
                id={note.id}
                color={note.color}
                title={note.title}
                description={note.description}
                date={note.date}
                onDelete={(e) => (
                  dispatch(deleteNote(note.id)),
                  note.id === updateData.id ? (updateData.id = null) : null
                )}
                onUpdate={() => setUpdateData({ ...note })}
              />
            ))}
          </div>
        </div>
        <div className="lg:col-span-3 xsm:col-span-2">
          <NoteInput updateData={updateData} key={updateData.id} />
        </div>
      </div>
    </>
  );
};

export default App;
