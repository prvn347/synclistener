
import { Camera, Search } from "lucide-react";

export function SearchBar(){

    return <div className="flex ">
        <input className="px-4 py-2 rounded-s-3xl bg-transparent border border-1 border-slate-500 placeholder:text-slate-500 focus:border-blue-500 outline-none placeholder:px-2" placeholder="Search " type="text" />
        <button className=" px-4 py-2   border-t border-b border-e border-e-1 rounded-e-3xl border-slate-500 bg-[#222222]"> < Search size={20}/> </button>

    </div>
}