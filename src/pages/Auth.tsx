import { Authentication } from "../components/Auth/Authentication";

export function Auth({ type }: { type: "signin" | "signup" }) {
  return (
    <div className=" min-h-screen">
      <Authentication type={type} />
    </div>
  );
}
