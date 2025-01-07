import { getBackground } from "@/actions/backgrounds";
import Image from "next/image";
import Radio from "./Radio";
import { getRadios } from "@/actions/radios";
import Clock from "./Clock";
import BackgroundImage from "./BackgroundImage";

export default async function Home() {
  const backgrounds = await getBackground();
  const radios = await getRadios();
  return (
    <div className="relative flex flex-col p-2 sm:p-4 md:p-8 h-screen max-h-screen max-w-full">
      <BackgroundImage backgrounds={backgrounds} />
      <span className="flex flex-col justify-between h-full">
        <main className="min-w-96 bgblur-4 relative z-10 w-full sm:max-w-[32rem] size-max p-6 flex flex-col gap-2 rounded-2xl bg-black/20 border-[1px] border-black/20">
          <Image src="/lofodo-text.svg" width={172} height={0} alt="Lofodo" />
          <p className="font-thin font-jetbrains-mono text-purple-500">
            Project created by{" "}
            <a
              href="https://haume.me"
              target="_blank"
              className="font-medium leading-3"
            >
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
              className="px-5 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 border-[1px] border-transparent ease-in-out duration-300 hover:border-white/20 rounded-xl"
            >
              Website
            </a>
            <a
              href="https://github.com/haume0"
              target="_blank"
              className="px-5 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 border-[1px] border-transparent ease-in-out duration-300 hover:border-white/20 rounded-xl"
            >
              Github
            </a>
            <a
              href="https://behance.net/haume"
              target="_blank"
              className="px-5 h-10 flex items-center justify-center bg-white/5 hover:bg-white/20 border-[1px] border-transparent ease-in-out duration-300 hover:border-white/20 rounded-xl"
            >
              Behance
            </a>
          </ul>
        </main>
        <span className="mx-auto mb-auto">
          <Clock />
        </span>
        <Radio radios={radios} />
      </span>
    </div>
  );
}
