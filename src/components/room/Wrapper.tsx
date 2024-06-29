import { ListCard } from "./ListCard";
import { SearchBar } from "./Search";
import { VideoPlayer } from "./VideoPlayer";

export function Wrapper() {
  return (
    <div className=" m-8 rounded-md bg-[#222222] h-2/3 p-5 grid grid-cols-1 md:grid-cols-2">
      <div>
        <VideoPlayer />

        {/* <div className=" font-manrope text-xl">Your Playlist</div> */}
      </div>
      <div className=" mt-4 md:mt-1">
        <SearchBar />
        <ListCard />
      </div>
    </div>
  );
}
