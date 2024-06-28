import { ListCard } from "./ListCard";
import {  SearchBar } from "./Search";

export function Wrapper(){


    return <div className=" m-8 rounded-md bg-[#222222] h-2/3 p-5 grid grid-cols-2">
        <div>
hello
        </div>
        <div>
            <SearchBar/>
            <ListCard/>
        </div>

    </div>
}