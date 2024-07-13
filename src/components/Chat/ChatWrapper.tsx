import { ChatInput } from "./InputBox";
import { ProfileInfoChat } from "./ProfileInfo";

export function ChatWrapper() {
  return (
    <div className="max-w-xl border border-darkie bg-gray-900 rounded-md p-2 flex flex-col justify-between h-96 mx-4">
      <ProfileInfoChat />
      <ChatInput />
    </div>
  );
}
