import { NoRoom } from "../components/Home/NoRoom";
import { motion } from "framer-motion";
import { routeVariants } from "../utils/AnimationVarient";
export function Home() {
  return (
    <motion.div variants={routeVariants} initial="initial" animate="final">
      <NoRoom />
    </motion.div>
  );
}
