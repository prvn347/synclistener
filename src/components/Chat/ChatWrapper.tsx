import { useRecoilState } from "recoil";
import { ChatInput } from "./InputBox";
import { ProfileInfoChat } from "./ProfileInfo";
import { ChevronDown, ChevronUp } from "lucide-react";
import { hiddenState } from "../../store/atoms";
import { routeVariants } from "../../utils/AnimationVarient";
import { motion } from "framer-motion";

export function ChatWrapper() {
  const [hidden, setHiddenState] = useRecoilState(hiddenState);
  return (
    <motion.div
      variants={routeVariants}
      initial="initial"
      animate="final"
      className={`max-w-xl border border-slate-500 bg-teal-500 bg-opacity-10 rounded-md p-2 flex flex-col justify-between ${
        hidden ? "h-12" : "h-96"
      } my-4`}
    >
      <div
        onClick={() => {
          setHiddenState((prev) => !prev);
        }}
        className=" cursor-pointer text-start font-manrope border-b border-slate-600  flex justify-between"
      >
        <h2 className=" py-1  font-manrope text-white ">Chat</h2>
        <button>{hidden ? <ChevronDown /> : <ChevronUp />}</button>
      </div>
      <ProfileInfoChat />
      <ChatInput />
    </motion.div>
  );
}
