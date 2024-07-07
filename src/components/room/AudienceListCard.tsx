import { useRecoilValue } from "recoil";
import { roomDetailState } from "../../store/atoms";

export function Audience() {
  const roomDetails = useRecoilValue(roomDetailState);
  return (
    <div className=" max-w-xl">
      {roomDetails?.result.users.map((value) => (
        <div className=" flex items-center ">
          <div className="rounded-full h-8 w-8 bg-slate-200 flex justify-center mr-2">
            <div className="flex flex-col justify-center h-full text-xl">
              {value.name[0]}
            </div>
          </div>
          <div className=" flex flex-col text-start ">
            <span className=" text-sm font-manrope"> {value.name}</span>
            <span className="text-xs font-manrope  text-blue-500">
              Listening
            </span>
          </div>{" "}
        </div>
      ))}
    </div>
  );
}
