import { useEffect, useRef, useState } from "react";
import { ListCard } from "./ListCard";
import { SearchBar } from "./Search";
import { VideoPlayer } from "./VideoPlayer";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../Spinner";
import { RoomDetails } from "../../api";
import { RoomDetailsCard } from "./RoomDetails";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { hostNameState, roomDetailState } from "../../store/atoms";
import { toast } from "sonner";
import { CopyIcon } from "lucide-react";
import { ChatWrapper } from "../Chat/ChatWrapper";
import { userNameSelector } from "../../store/selectors";

export function Wrapper() {
  const setRoomMeta = useSetRecoilState(roomDetailState);
  const [menuActive, setMenuActive] = useState(false);
  const handleToggleMenu = () => {
    setMenuActive((menuActive) => !menuActive);
  };
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const host = useRecoilValue(hostNameState);
  const user = useRecoilValue(userNameSelector);
  const query = useParams();
  const modalRef = useRef<HTMLDivElement>(null);
  const id = query.id;
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setMenuActive(false);
      }
    };

    if (menuActive) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuActive, setMenuActive]);
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
    <div className=" ">
      <div className=" mx-1 sm:mx-8 text-start">
        <button
          onClick={() => {
            navigator.clipboard.writeText(id as string);
            toast("Code copied!");
            setMenuActive(true);
          }}
          className=" flex items-center gap-2 text-white hover:bg-green-800 bg-black  dark:bg-white dark:text-black rounded-sm text-sm font-manrope px-2 py-1"
        >
          copy invite code <CopyIcon size={14} />
        </button>
        {menuActive ? (
          <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div
                ref={modalRef}
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
              >
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  Share via
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className=" m-1 sm:m-8 rounded-md bg-[#222222] p-2   sm:p-5 grid grid-cols-1 md:grid-cols-2">
        <div>
          <VideoPlayer />
          <RoomDetailsCard />

          {/* <div className=" font-manrope text-xl">Your Playlist</div> */}
        </div>
        <div className=" my-4 mx-1 md:mx-4 mt-4 md:mt-1">
          <ChatWrapper />
          {host === user ? <SearchBar /> : null}
          <ListCard />
          <div className="  text-right">
            <button
              onClick={() => {
                navigate("/home");
              }}
              className=" m-5  bg-red-600 text-sm font-manrope px-3 py-2  rounded-sm font-semibold text-white"
            >
              {" "}
              Leave Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
