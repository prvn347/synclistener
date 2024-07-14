import { ChatInput } from "./InputBox";
import { ProfileInfoChat } from "./ProfileInfo";

export function ChatWrapper() {
  return (
    <div className="max-w-xl border border-slate-500 bg-teal-500 bg-opacity-10 rounded-md p-2 flex flex-col justify-between h-96 my-4">
      <ProfileInfoChat />
      <ChatInput />
    </div>
  );
}
