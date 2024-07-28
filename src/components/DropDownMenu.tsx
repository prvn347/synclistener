import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useRecoilValue } from "recoil";
import { hostNameState, listenerState, wsState } from "../store/atoms";
import { userNameSelector } from "../store/selectors";

export default function DropDownAudience() {
  const audienceName = useRecoilValue(listenerState);
  const host = useRecoilValue(hostNameState);
  const user = useRecoilValue(userNameSelector);
  const ws = useRecoilValue(wsState);
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton>
          <div className=" flex">
            <span className="relative inline-block overflow-hidden rounded-full p-[1px]">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a9a9a9_0%,#0c0c0c_50%,#a9a9a9_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#171717_0%,#737373_50%,#171717_100%)]" />
              <div className="inline-flex h-full w-full cursor-pointer justify-center rounded-full bg-white px-3 py-1 text-xs font-medium leading-5 text-slate-600 backdrop-blur-xl dark:bg-black dark:text-slate-200">
                {host} is hosting
                <span className="inline-flex items-center pl-2 text-black dark:text-white">
                  {host === user && (
                    <ChevronDown
                      className="pl-0.5 text-black dark:text-white"
                      size={16}
                    />
                  )}
                </span>
              </div>
            </span>
          </div>
          {/* <ChevronDown  className="-mr-1 h-5 w-5 text-gray-400" /> */}
        </MenuButton>
      </div>
      {host === user ? (
        <MenuItems
          transition
          className="absolute left-1 z-10  w-56 origin-top-right rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-1 border-b  border-teal-200">
            <span className=" text-sm text-teal-300   px-2  ">Set Host:</span>
            {audienceName.map((value, key) => (
              <MenuItem>
                <div
                  key={key}
                  onClick={() => {
                    ws?.send(
                      JSON.stringify({
                        type: "transferHost",
                        params: {
                          newHostName: value.name,
                        },
                      })
                    );
                  }}
                  className="block px-4 py-2 text-sm  rounded-sm text-neutral-200 data-[focus]:text-black data-[focus]:bg-teal-300 "
                >
                  {value.name}
                </div>
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      ) : null}
    </Menu>
  );
}
