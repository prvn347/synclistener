import { useRecoilValue } from "recoil";
import { hiddenState, messageState } from "../../store/atoms";
import { useEffect, useRef } from "react";

export function ProfileInfoChat() {
  const messageMeta = useRecoilValue(messageState);
  const containerRef = useRef<any>(null);
  const hide = useRecoilValue(hiddenState);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messageMeta]);

  return (
    <>
      <div
        ref={containerRef}
        className={`flex toggle-content flex-col h-96 overflow-y-scroll gap-3 text-wrap text-start ${
          hide ? "hidden" : "block"
        } `}
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
