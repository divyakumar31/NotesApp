import React from "react";

const Note = ({
  title,
  description,
  date,
  color,
  onUpdate,
  onDelete,
  classes,
}) => {
  return (
    <div
      className={`rounded-md text-black p-4 flex flex-col gap-1 cursor-pointer ${classes} relative`}
      style={{ backgroundColor: color }}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-nowrap truncate text-sm">{description}</p>
      <p className="text-sm text-gray-500 font-medium">{date}</p>
      <div className="absolute top-0 right-0">
        <div className="p-4">
          <i
            className="fa-solid fa-trash-can hover:text-red-500"
            onClick={onDelete}
          ></i>
        </div>
        <div className="p-4">
          <i
            className="fa-solid fa-edit hover:text-red-500"
            onClick={onUpdate}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Note;
