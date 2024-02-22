import React from "react";

function ListItem({ comuna }) {
  return (
    <div className="flex p-3 bg-green-200 m-2 text-blue-950 rounded-full hover:bg-green-600 hover:text-white hover:cursor-pointer transition">
      <div className="mx-3 font-bold">{comuna[0]}</div>
      <div className="font-semibold">{comuna[1]}</div>
    </div>
  );
}

export default ListItem;
