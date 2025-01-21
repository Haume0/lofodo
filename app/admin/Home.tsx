import { addRadio, getRadios, updateRadio } from "@/actions/radios";
import { checkToken } from "@/auth";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import RemoveRadioButton from "./RemoveButton";

export default async function Home() {
  //Userdata
  const user = (await checkToken((await cookies()).get("hwt")?.value || ""))[1];
  //Radios
  const radios = await getRadios();
  if (!user) {
    return <h1>Unauthorized</h1>;
  }
  return (
    <>
      <div className="flex gap-2 bg-white/10 rounded-3xl border-[1px] border-white/20 p-4 justify-between w-[28rem]">
        <span>
          <p className="text-base text-purple-500 font-light">Welcome,</p>
          <h1 className="text-lg font-semibold">{user.name}</h1>
        </span>
        <button
          className="hover:bg-red-500/10 hover:text-red-500 border-[1px] border-transparent ease-smooth duration-300 hover:border-red-500/20 px-4 py-1 size-max rounded-full"
          onClick={async () => {
            "use server";
            (await cookies()).delete("hwt");
            revalidatePath("/admin");
          }}
        >
          Logout
        </button>
      </div>
      <div className="flex flex-col gap-2 bg-white/10 rounded-3xl border-[1px] border-white/20 p-4 justify-between w-[28rem]">
        <h1 className="text-center w-full text-3xl font-black">Radios</h1>
        <form
          action={async (e) => {
            "use server";
            const add_url = e.get("add_url")?.toString() || "";
            await addRadio(add_url);
            revalidatePath("/admin");
          }}
          className="flex"
        >
          <input
            type="text"
            name={"add_url"}
            placeholder="Enter youtube url."
            className={`peer px-3 w-full bg-blur-4 rounded-xl h-10 bg-white/10 focus:bg-white/20 border border-transparent ease-in-out focus:border-white/20 outline-none duration-300`}
          />
          <button
            className={`ml-1 opacity-100 px-5 bg-blur-4 w-24 overflow-clip h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-transparent ease-in-out hover:border-white/20 rounded-xl duration-300`}
            title="Add radio."
          >
            Add
          </button>
        </form>
        <ul className="flex flex-col-reverse max-h-96 overflow-auto gap-1">
          {radios.map((item, index) => (
            <form
              action={async (e) => {
                "use server";
                const old_url = e.get("old_url")?.toString() || "";
                const new_url = e.get("new_url")?.toString() || "";
                await updateRadio(old_url, new_url);
                revalidatePath("/admin");
              }}
              key={index}
              className="flex"
            >
              <input type="hidden" name={"old_url"} defaultValue={item} />
              <input
                type="text"
                name={"new_url"}
                defaultValue={item}
                placeholder="Enter youtube url."
                className={`peer px-3 w-full bg-blur-4 rounded-xl h-10 bg-white/10 focus:bg-white/20 border border-transparent ease-in-out focus:border-white/20 outline-none duration-300`}
              />
              <button
                className={`w-0 p-0 opacity-0 ml-0 peer-focus:ml-1 peer-focus:opacity-100 peer-focus:px-5 bg-blur-4 peer-focus:delay-100 delay-1000 peer-focus:w-24 overflow-clip h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-transparent ease-in-out hover:border-white/20 rounded-xl duration-300`}
                title="Modify radio."
              >
                Modify
              </button>
              <RemoveRadioButton url={item} />
            </form>
          ))}
        </ul>
      </div>
    </>
  );
}
