export function ProfileInfoChat() {
  return (
    <div className=" flex gap-3 items-center text-start">
      <div className=" flex items-center">
        <div className="rounded-full h-5 w-5 bg-purple-600 flex justify-center mr-1">
          <div className="flex flex-col justify-center h-full text-sm">P</div>
        </div>
        <div className=" flex flex-col text-start ">
          <span className=" text-sm font-manrope text-neutral-100">
            {" "}
            Pravin
          </span>
        </div>
      </div>
      <span className=" text-sm  "> message</span>
    </div>
  );
}
