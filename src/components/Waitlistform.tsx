import { useState } from "react";
import { sendWaitlist } from "../api";
import { Heart } from "lucide-react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  return (
    <div>
      <div className={`flex  justify-center  max-h-screen`}>
        <div className=" flex flex-col justify-center h-screen ">
          <div className={` ${showForm ? " hidden" : ""} flex flex-col`}>
            {" "}
            <label className="font-bold font-manrope text-2xl text-black dark:text-white ">
              Join the Waitlist for future updates.
            </label>
            <input
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your valid email"
              className="border rounded-lg py-3 px-3 mt-4 bg-black border-green-600 placeholder-white-500 text-white"
            />
            <button
              onClick={async () => {
                await sendWaitlist(email);
                setShowForm(true);
              }}
              className=" px-2 py-2 rounded-sm mt-4 dark:bg-white  dark:text-black text-white bg-black"
            >
              {" "}
              Submit
            </button>
          </div>
        </div>

        {showForm && (
          <span className=" text-black dark:text-white  form-container text-2xl font-manrope flex items-center ">
            {" "}
            Thankyou for your interest{" "}
            <Heart className=" border-none" fill="red" />
          </span>
        )}
      </div>
    </div>
  );
}
