import { WaitlistForm } from "../components/Waitlistform";
import { motion } from "framer-motion";
import { routeVariants } from "../utils/AnimationVarient";
export function Waitlist() {
  return (
    <motion.div
      variants={routeVariants}
      initial="initial"
      animate="final"
      className=" max-h-screen"
    >
      <WaitlistForm />
    </motion.div>
  );
}
