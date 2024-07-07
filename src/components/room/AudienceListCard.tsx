import { useRecoilState, useRecoilValue } from "recoil";
import { listenerState, wsState } from "../../store/atoms";
import { useEffect } from "react";

export function Audience() {
  const ws = useRecoilValue(wsState);
  const [audienceName, setAudienceName] = useRecoilState(listenerState);
  useEffect(() => {
    if (ws) {
      console.log("chekcing for message" + JSON.stringify(audienceName));
      ws.onmessage = (message) => {
        console.log("Message received in audience:", message.data);

        const data = JSON.parse(message.data);
        if (data.type == "joined") {
          setAudienceName((prevAudienceName) => [
            ...prevAudienceName,
            { name: data.name },
          ]);
        }
      };
    }
  }, []);

  return (
    <div className=" max-w-xl">
      {audienceName.map((value) => (
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
