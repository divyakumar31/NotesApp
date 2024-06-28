import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote, updateNote } from "../features/note/noteSlice";
import { nanoid } from "@reduxjs/toolkit";

const getDateString = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const colors = [
  "#fcd34d",
  "#d8b4fe",
  "#86efac",
  "#fca5a5",
  "#93c5fd",
  "#e5e7eb",
  "#5eead4",
];

const NoteInput = ({ updateData = {} }) => {
  const data = updateData.id
    ? { ...updateData, date: getDateString() }
    : { title: "", description: "", date: getDateString(), color: colors[0] };

  const [formData, setFormData] = useState(data);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title !== "") {
      if (updateData.id) {
        dispatch(updateNote({ ...formData, id: updateData.id }));
        updateData.id = null;
      } else {
        dispatch(addNote([{ ...formData, id: nanoid() }]));
      }
      setFormData({
        title: "",
        description: "",
        date: getDateString(),
        color: colors[0],
      });
    }
  };

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form
        className="flex flex-col gap-4 p-2 xsm:p-5 sm:h-screen max-h-screen"
        style={{ backgroundColor: formData.color }}
        onSubmit={handleSubmit}
        onReset={() => (
          (updateData.id = null),
          setFormData({
            title: "",
            description: "",
            date: getDateString(),
            color: colors[0],
          })
        )}
      >
        <div className="xsm:hidden text-xl font-medium text-slate-700">
          Create Note
        </div>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInput}
          required
          className="w-full p-2.5 outline-none bg-slate-300 rounded-lg shadow-lg text-2xl font-medium"
        />

        <div className="text-lg font-medium text-slate-400">
          <span className="mr-2">
            <i className="fa-solid fa-calendar-days"></i>
          </span>
          Date: {getDateString()}
        </div>

        <textarea
          name="description"
          id="description"
          cols="30"
          rows="12"
          placeholder="Enter description of the note..."
          value={formData.description}
          onChange={handleInput}
          required
          className="text-lg w-full p-2.5 outline-none bg-slate-300 rounded-lg shadow-lg font-medium resize-none h-60 xsm:h-fit"
        ></textarea>

        <div className="flex flex-wrap gap-2 sm:gap-4">
          {colors.map((color) => (
            <div
              className="w-10 h-10 rounded-full shadow-lg shadow-slate-400 cursor-pointer"
              style={{ backgroundColor: color }}
              key={color}
              onClick={() => setFormData({ ...formData, color })}
            ></div>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="p-2.5 w-20 bg-blue-500 rounded-md text-white hover:bg-blue-600"
          >
            Save
          </button>
          <button
            type="reset"
            className="p-2.5 w-20 bg-red-500 rounded-md text-white hover:bg-red-600"
          >
            Reset
          </button>
        </div>
      </form>
    </>
  );
};

export default NoteInput;
