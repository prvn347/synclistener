import { useEffect, useState } from "react";
import { ListCard } from "./ListCard";
import { SearchBar } from "./Search";
import { VideoPlayer } from "./VideoPlayer";
import { useRecoilState } from "recoil";
import { videoIdState, wsState } from "../../store/atoms";

export function Wrapper() {
  return (
    <div className=" m-8 rounded-md bg-[#222222] h-2/3 p-5 grid grid-cols-2">
      <div>
        <VideoPlayer />

        <div>Your Playlist</div>
      </div>
      <div>
        <SearchBar />
        <ListCard />
      </div>
    </div>
  );
}
