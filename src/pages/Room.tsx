import { Wrapper } from "../components/Room/Wrapper";
import { motion } from "framer-motion";
import { routeVariants } from "../utils/AnimationVarient";
export function Room() {
  return (
    <motion.div variants={routeVariants} initial="initial" animate="final">
      <div>
        <Wrapper />
      </div>
    </motion.div>
  );
}
