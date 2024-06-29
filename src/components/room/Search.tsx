
import { Search } from "lucide-react";
import {  useState } from "react";
import { searchVideos } from "../../api";
import { useSetRecoilState } from "recoil";
import { searchResultState } from "../../store/atoms";

export function SearchBar(){
    const [searchInput, setsearchInput]  = useState('')
    const setSearchResult = useSetRecoilState(searchResultState)
    const handleSearch = async()=>{
        const resp = await searchVideos(searchInput);
        console.log(resp.data.items)
        setSearchResult(resp.data.items);


    }

    return <div className="flex ">
        <input onChange={(e)=> setsearchInput(e.target.value)} className="px-4 py-2 rounded-s-3xl bg-transparent border border-1 border-slate-500 placeholder:text-slate-500 focus:border-blue-500 outline-none placeholder:px-2" placeholder="Search " type="text" />
        <button onClick={handleSearch} className=" px-4 py-2   border-t border-b border-e border-e-1 rounded-e-3xl border-slate-500 bg-[#222222]"> < Search size={20}/> </button>

    </div>
}