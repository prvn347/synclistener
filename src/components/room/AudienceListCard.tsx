import { useRecoilValue } from "recoil";
import { listenerState } from "../../store/atoms";

export function Audience() {
  const audienceName = useRecoilValue(listenerState);

  return (
    <div className=" max-w-xl">
      {audienceName.map((value) => (
        <div className=" flex items-center ">
          <div className="rounded-full h-8 w-8 bg-purple-600 flex justify-center mr-2">
            <div className="flex flex-col justify-center h-full text-xl">
              {value.name[0]}
            </div>
          </div>
          <div className=" flex flex-col text-start ">
            <span className=" text-sm font-manrope text-neutral-100">
              {" "}
              {value.name}
            </span>
            <span className="text-xs font-manrope  text-blue-500">
              Listening
            </span>
          </div>{" "}
        </div>
      ))}
    </div>
  );
}
