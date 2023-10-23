import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="absolute top-[200px]">
      <SignUp />
    </div>
  );
}
