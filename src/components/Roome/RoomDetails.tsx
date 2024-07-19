import { Audience } from "./AudienceListCard";
import { useRecoilValue } from "recoil";
import { roomDetailState } from "../../store/atoms";

import DropDownAudience from "../DropDownMenu";

export function RoomDetailsCard() {
  const roomDetails = useRecoilValue(roomDetailState);
  return (
    <div className=" text-start flex flex-col gap-2">
      <span className=" font-manrope text-xl text-neutral-100   font-semibold pt-2 ">
        {roomDetails?.result.title}
      </span>

      <DropDownAudience />
      <div className=" text-xs text-neutral-100">Listeners:</div>
      <Audience />
    </div>
  );
}
