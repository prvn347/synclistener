import { useRecoilValue } from "recoil";
import { messageState } from "../../store/atoms";
import { useEffect, useRef } from "react";

export function ProfileInfoChat() {
  const messageMeta = useRecoilValue(messageState);
  const containerRef = useRef<any>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messageMeta]);

  return (
    <>
      <div className=" text-start font-manrope ">
        <h2 className=" py-1 border-b border-slate-600 font-manrope text-white ">
          Chat
        </h2>
      </div>
      <div
        ref={containerRef}
        className="flex flex-col h-96 overflow-y-scroll gap-3 text-wrap text-start"
      >
        {messageMeta.map((value, index) => (
          <div key={index} className="flex gap-3 font-manrope items-baseline">
            <div className="flex items-center">
              <div className="rounded-full h-5 w-5 bg-teal-600 flex justify-center mr-1">
                <div className="flex flex-col justify-center h-full text-sm">
                  {value.name[0]}
                </div>
              </div>
              <div className="flex flex-col text-start text-wrap">
                <span className="text-sm font-manrope text-neutral-100">
                  {value.name}
                </span>
              </div>
            </div>
            <span className="text-xs text-neutral-200">{value.message}</span>
          </div>
        ))}
      </div>
    </>
  );
}
