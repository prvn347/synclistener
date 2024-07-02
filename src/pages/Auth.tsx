import { Authentication } from "../components/Auth/Authentication";

export function Auth({ type }: { type: "signin" | "signup" }) {
  return (
    <div>
      <Authentication type={type} />
    </div>
  );
}
