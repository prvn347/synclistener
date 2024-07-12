import { NoRoom } from "../components/Home/NoRoom";
import { motion } from "framer-motion";
import { routeVariants } from "../utils/AnimationVarient";
import { useEffect } from "react";
import { pupulateRoom } from "../api";
import { Rooms } from "../components/Roome/Rooms";
import { useRecoilState } from "recoil";
import { userRoomsState } from "../store/atoms";
export function Home() {
  const [rooms, setRoom] = useRecoilState(userRoomsState);
  useEffect(() => {
    const fetchRooms = async () => {
      console.log("here");
      const resp = await pupulateRoom();
      console.log(resp.data);
      setRoom(resp.data.rooms);
    };
    fetchRooms();
    return;
  }, []);
  return (
    <motion.div variants={routeVariants} initial="initial" animate="final">
      {rooms[0] ? <Rooms /> : <NoRoom />}
    </motion.div>
  );
}
