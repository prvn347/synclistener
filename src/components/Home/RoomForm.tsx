import { useState } from "react";

export enum roomType {
  JOIN,
  CREATE,
}
interface RoomFormProps {
  Room: { Room: roomType };
}
export function RoomForm({ Room }: RoomFormProps) {
  const [text, setText] = useState("");
  const isJoin = Room.Room === roomType.JOIN;
  return (
    <div className="form-container bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]  flex flex-col justify-center h-screen ">
      <h2 className="text-2xl font-manrope font-bold mb-4">
        {isJoin ? "Join a Room " : "Create a Room"}
      </h2>
      <form className=" flex  flex-col justify-center items-center">
        <div className="mb-4  flex flex-col text-start justify-center w-56">
          <label className="block dark:text-neutral-200 text-gray-700">
            {isJoin ? "Enter Room Key" : "Room Name"}
          </label>
          <input
            type="text"
            className="mt-1 p-2 py-2 placeholder:text-sm placeholder:font-manrope block border rounded-md outline-none focus:border-green-300 dark:bg-[#222222]"
            placeholder={isJoin ? "paste your key here" : "eg:homies,theatre"}
          />
        </div>
        <button
          type="submit"
          className="bg-black dark:bg-white font-manrope font-semibold dark:text-black text-white p-2 px-3 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
