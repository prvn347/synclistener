import { useState } from "react";
import { Illustration } from "./Illus";
import { RoomForm } from "./RoomForm";
import { roomType } from "./RoomForm";

export function NoRoom() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className=" ">
      <div className={`content-wrapper ${showForm ? "hide" : ""}`}>
        <Illustration />
        <div className=" font-manrope text-3xl font-bold">
          {" "}
          You have no rooms
        </div>
        <div className=" m-4">
          <button
            onClick={() => {
              setShowForm(true);
            }}
            className=" font-manrope font-semibold  rounded-sm px-6 bg-black dark:bg-white text-white dark:text-black p-2"
          >
            {" "}
            Create Room
          </button>
        </div>
      </div>
      <div className={`form-wrapper ${showForm ? "show" : ""}`}>
        {showForm && <RoomForm Room={{ Room: roomType.CREATE }} />}
      </div>
    </div>
  );
}
