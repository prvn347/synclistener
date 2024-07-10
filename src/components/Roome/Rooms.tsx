import { useRecoilValue } from "recoil";
import { userRoomsState } from "../../store/atoms";
import { Copy, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { RoomForm, roomType } from "../Home/RoomForm";

export function Rooms() {
  const userRooms = useRecoilValue(userRoomsState);
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      <div className={`content-wrapper ${showForm ? "hide" : ""}`}>
        <h3 className=" font-manrope text-2xl m-3  ">Your rooms</h3>
        <button
          onClick={() => {
            setShowForm(true);
          }}
          className=" flex font-manrope py-1 my-3  rounded-sm px-3 bg-black dark:bg-white text-white dark:text-black "
        >
          Create New <PlusCircle />
        </button>
        <div className=" grid grid-cols-2">
          {userRooms.map((value) => (
            <div className=" bg-green-300 bg-opacity-30 border mx-2 border-green-600 p-6 rounded-sm">
              <div className=" flex flex-col  gap-2 items-center">
                <span className=" text-black text-md font-manrope font-medium ">
                  {value.title}
                </span>
                <span className=" flex items-center text-black text-md font-manrope font-medium ">
                  {value.roomKey}{" "}
                  <Copy
                    onClick={() => {
                      navigator.clipboard.writeText(value.roomKey);
                      toast("Code copied!");
                    }}
                    size={15}
                  />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`form-wrapper ${showForm ? "show" : ""}`}>
        {showForm && <RoomForm Room={{ Room: roomType.CREATE }} />}
      </div>
    </div>
  );
}
