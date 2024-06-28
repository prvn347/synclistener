import img from "../../assets/thumb.jpg"
export function ListCard(){
    return <div  className=" max-w-2xl ">
        <div className=" flex  p-3 text-start">
            <img className=" rounded-md" src= {img} alt="e" height= "120px" width="120px" />
            <div className=" px-2 flex flex-col">
                <span className=" text-md">title</span>
                <span className=" text-xs py-1 font-light">date</span>
                <div className=" flex  items-center gap-1">
                    <img src={img}  height="32px" width="32px" alt="" className=" w-5 h-5 rounded-full object-cover" />
                    <span  className=" text-xs font-thin">author
                    </span>
                </div>

            </div>
        </div>
    </div>
}