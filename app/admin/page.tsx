import { checkToken, checkUser } from "@/auth";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Home from "./Home";

export default async function page() {
  const isLoggedIn = (
    await checkToken((await cookies()).get("hwt")?.value || "")
  )[0];
  console.log(isLoggedIn);
  return (
    <section className="p-16 flex flex-col gap-4 relative items-center min-h-svh justify-center">
      {!isLoggedIn ? <Login /> : <Home />}
    </section>
  );
}

function Login() {
  return (
    <form
      action={async (e) => {
        "use server";
        const username = e.get("username")?.toString() || "";
        const password = e.get("password")?.toString() || "";
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);
        const [result, hash] = await checkUser({
          name: username,
          password: password,
        });
        console.log(`Result: ${result}`);
        console.log(`Hash: ${hash}`);
        if (result) {
          //add hash to cookie hwt=hash
          (await cookies()).set("hwt", hash);
          revalidatePath("/admin");
        }
      }}
      className="flex flex-col w-[28rem] relative gap-2"
    >
      <h1 className="text-center text-4xl font-black">LOFODO Admin Panel</h1>
      <input
        type="text"
        name="username"
        placeholder="Enter admin username."
        className="px-3 w-full bgblur-4 rounded-xl h-10 bg-white/10 focus:bg-white/20 border-[1px] border-transparent ease-in-out focus:border-white/20 outline-none duration-300"
      />
      <input
        type="text"
        name="password"
        placeholder="Enter password."
        className="px-3 w-full bgblur-4 rounded-xl h-10 bg-white/10 focus:bg-white/20 border-[1px] border-transparent ease-in-out focus:border-white/20 outline-none duration-300"
      />
      <button
        className="px-5 bgblur-4 size-full h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 border-[1px] border-transparent ease-in-out hover:border-white/20 rounded-xl duration-300"
        title="Change radio."
      >
        Enter
      </button>
    </form>
  );
}
