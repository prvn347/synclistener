import { useRecoilValue } from "recoil";
import { wsState } from "../../store/atoms";
import { useState } from "react";
import { userNameSelector } from "../../store/selectors";

export function ChatInput() {
  const ws = useRecoilValue(wsState);
  const [message, setMessage] = useState("");
  const user = useRecoilValue(userNameSelector);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (ws) {
      ws.send(
        JSON.stringify({
          type: "message",
          params: { message: message, name: user },
        })
      );
      setMessage("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="chat" className="sr-only">
        Your message
      </label>
      <div className="flex items-center py-2 px-1">
        <input
          id="chat"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="block mx-4 p-2.5 w-full text-sm  bg-white rounded-3xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-teal-600 dark:bg-opacity-30 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Chat"
        ></input>
        <button
          type="submit"
          className="inline-flex justify-center p-2 text-teal-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-teal-500 dark:hover:bg-gray-600"
        >
          <svg
            className="w-6 h-6 rotate-90"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
          </svg>
        </button>
      </div>
    </form>
  );
}
