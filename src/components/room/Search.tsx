import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { searchVideos } from "../../api";
import { useSetRecoilState } from "recoil";
import { searchResultState } from "../../store/atoms";

export function SearchBar() {
  const [searchInput, setsearchInput] = useState("");
  const setSearchResult = useSetRecoilState(searchResultState);
  const handleSearch = async () => {
    const resp = await searchVideos(searchInput);
    console.log(resp.data.items);
    setSearchResult(resp.data.items);
  };
  const handleHitEnter = () => {
    const input = document.getElementById("textInput");
    input?.addEventListener("keypress", (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        document.getElementById("btn")?.click();
      }
    });
  };
  useEffect(() => {
    handleHitEnter();
  }, []);
  return (
    <div className="flex mx-4 m-3 ">
      <input
        id="textInput"
        onChange={(e) => setsearchInput(e.target.value)}
        className="px-4 py-2 rounded-s-3xl  w-96 bg-transparent border border-1 border-slate-500 placeholder:text-slate-500 focus:border-blue-500 outline-none placeholder:px-2"
        placeholder="Search "
        type="text"
      />
      <button
        onClick={handleSearch}
        className=" px-4 py-2   border-t border-b border-e border-e-1 rounded-e-3xl border-slate-500 bg-[#222222]"
      >
        {" "}
        <Search size={20} />{" "}
      </button>
    </div>
  );
}
