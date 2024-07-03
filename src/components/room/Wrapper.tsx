import { useEffect, useState } from "react";
import { ListCard } from "./ListCard";
import { SearchBar } from "./Search";
import { VideoPlayer } from "./VideoPlayer";

import { useParams } from "react-router-dom";
import { Spinner } from "../Spinner";
import { RoomDetails } from "../../api";
import { RoomDetailsCard } from "./RoomDetails";
import { useRecoilState } from "recoil";
import { roomDetailState } from "../../store/atoms";

export function Wrapper() {
  const [roomMeta, setRoomMeta] = useRecoilState(roomDetailState);
  const [loading, setLoading] = useState(true);
  const query = useParams();
  const id = query.id;
  useEffect(() => {
    const fetchData = async () => {
      const resp = await RoomDetails(id as string);

      setRoomMeta(resp.data);
      setLoading(false);
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <div className=" flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div className=" m-8 rounded-md bg-[#222222] h-2/3 p-5 grid grid-cols-1 md:grid-cols-2">
      <div>
        <VideoPlayer />
        <RoomDetailsCard />

        {/* <div className=" font-manrope text-xl">Your Playlist</div> */}
      </div>
      <div className=" mt-4 md:mt-1">
        <SearchBar />
        <ListCard />
      </div>
    </div>
  );
}
