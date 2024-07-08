import { RoomForm, roomType } from "./RoomForm";
import { motion } from "framer-motion";
import { routeVariants } from "../../utils/AnimationVarient";
export function JoinRoom() {
  return (
    <motion.div variants={routeVariants} initial="initial" animate="final">
      <RoomForm
        Room={{
          Room: roomType.JOIN,
        }}
      />
    </motion.div>
  );
}
