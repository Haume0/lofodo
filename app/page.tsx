import { getBackground } from "@/actions/backgrounds";
import Image from "next/image";
export default async function Home() {
  const backgrounds = await getBackground();
  return (
    <div className="relative p-8 min-h-[100dvh]">
      <Image
        src={backgrounds[Math.floor(Math.random() * backgrounds.length)].image}
        width={1920}
        height={0}
        className="size-full absolute object-cover object-center left-0 top-0 -z-10"
        quality={80}
        alt=""
      />
      <main
        style={{
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
        className="min-w-96 max-w-[32rem] size-max relative p-6 flex flex-col gap-2 rounded-2xl bg-black/20 border-[1px] border-black/20">
        <Image src="/lofodo-text.svg" width={172} height={0} alt="Lofodo" />
        <p className="font-thin font-jetbrains-mono text-purple-500">
          Project created by{" "}
          <a
            href="https://haume.me"
            target="_blank"
            className="font-medium leading-3">
            Haume
          </a>
          .
        </p>
        <p className="font-thin font-jetbrains-mono leading-5">
          Customizable, advanced focusing application. Lofodo is a combination
          of the Pomodoro technique and the Lofi music genre.
        </p>

        <ul className="flex gap-2 mt-2">
          <a
            href="https://haume.me"
            target="_blank"
            className="px-5 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 border-[1px] border-transparent ease-in-out duration-300 hover:border-white/20 rounded-xl">
            Website
          </a>
          <a
            href="https://github.com/haume0"
            target="_blank"
            className="px-5 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 border-[1px] border-transparent ease-in-out duration-300 hover:border-white/20 rounded-xl">
            Github
          </a>
          <a
            href="https://behance.net/haume"
            target="_blank"
            className="px-5 h-10 flex items-center justify-center bg-white/5 hover:bg-white/20 border-[1px] border-transparent ease-in-out duration-300 hover:border-white/20 rounded-xl">
            Behance
          </a>
        </ul>
      </main>
      <section></section>
      <div className="flex gap-2 flex-col"></div>
    </div>
  );
}
