import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser, findUser } from "../../api";

export interface postType {
  email: string;
  username?: string;
  name?: string;
  password: string;
}
export function Authentication({ type }: { type: "signin" | "signup" }) {
  const [postInput, setPostInput] = useState<postType>({
    name: "",
    username: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  return (
    <div>
      <div className=" font-manrope flex flex-col items-center">
        <div>
          <div className=" mb-16">
            <span className="text-2xl font-medium  ">
              {type === "signin" ? "Hello,who's this?" : "Welcome!"}
            </span>
          </div>
          <LabeledInput
            onchange={(e) => {
              setPostInput({ ...postInput, email: e.target.value });
            }}
            label="Email"
            placeholder="Email"
            type="email"
          />
          {type === "signup" ? (
            <LabeledInput
              onchange={(e) => {
                setPostInput({ ...postInput, username: e.target.value });
              }}
              label="Username"
              placeholder="Username"
              type="text"
            />
          ) : null}
          <LabeledInput
            onchange={(e) => {
              setPostInput({ ...postInput, password: e.target.value });
            }}
            label="Password"
            type="password"
            placeholder="Password min. 8 characters"
          />
          {type === "signup" ? (
            <LabeledInput
              onchange={(e) => {
                setPostInput({ ...postInput, name: e.target.value });
              }}
              label="Name"
              placeholder="Name"
              type="text"
            />
          ) : null}
          <button
            onClick={async () => {
              const resp =
                type === "signup"
                  ? await createUser(postInput)
                  : await findUser(postInput);
              navigate("/home");
            }}
            type="button"
            className="mt-8 w-full text-white  bg-black dark:bg-white dark:text-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-sm text-sm px-5 py-2.5 me-2 mb-2  dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            {type === "signup" ? "Sign up" : "Sign in"}
          </button>
          <div>
            <span className="text-md   font-medium ">
              {type === "signin"
                ? "Don't have an account yet?"
                : "Already have an account?"}
            </span>
            <Link
              className="px-2 py-1 mx-2 border-black text-sm  dark:border-white hover:text-btncolor hover:border-btncolor underline  "
              to={type === "signin" ? "/signup" : "/signin"}
            >
              {type === "signin" ? "Sign up" : "Log in"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

interface post {
  placeholder: string;
  type: string;
  label: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export function LabeledInput({ label, type, placeholder, onchange }: post) {
  return (
    <div className="flex flex-col text-start ">
      <label
        className=" pt-2 text-md font-medium pb-3   text-black  dark:text-white "
        htmlFor="input"
      >
        {label}{" "}
      </label>
      <input
        onChange={onchange}
        className=" rounded-md px-2 font-medium items-center py-2 placeholder:text-sm placeholder:font-medium  dark:text-stone-50 dark:bg-darkie text-black border shadow-[3px_3px_rgba(0,_98,_90,_0.4),_6px_6px_rgba(0,_98,_90,_0.3)] outline-none border-black w-72 focus:shadow-purple-700"
        id="input"
        type={type}
        placeholder={placeholder}
        required
      />
    </div>
  );
}
