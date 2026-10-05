import { getBackground } from "@/actions/backgrounds";
import Image from "next/image";
import Radio from "../components/Radio";
import { getRadios } from "@/actions/radios";
import Clock from "../components/Clock";
import BackgroundImage from "../components/BackgroundImage";

export default async function Home() {
  const backgrounds = await getBackground();
  const radios = await getRadios();
  return (
    <div className="relative flex flex-col p-3 sm:p-4 lg:p-8 min-h-dvh lg:h-screen lg:max-h-screen max-w-full">
      {/* Below lg this column is the positioning context, so the background
          buttons sit inside the header card; on lg it's static and they go
          back to the page corner. */}
      <span className="relative lg:static flex flex-col gap-3 sm:gap-4 lg:gap-0 lg:justify-between lg:h-full w-full max-w-xl mx-auto lg:max-w-none lg:mx-0">
        <BackgroundImage backgrounds={backgrounds} />
        <main className="snap-center bgblur-4 relative z-10 w-full lg:max-w-lg h-max p-4 sm:p-6 flex flex-col gap-2 rounded-2xl bg-black/20 border border-black/20">
          <Image
            src="/lofodo-text.svg"
            width={172}
            height={0}
            alt="Lofodo"
            className="w-32 sm:w-[172px] h-auto"
          />
          <p className="font-thin font-jetbrains-mono text-sm sm:text-base text-purple-500">
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
          <p className="font-thin font-jetbrains-mono text-sm/5 sm:text-base/5">
            Customizable, advanced focusing application. Lofodo is a combination
            of the Pomodoro technique and the Lofi music genre.
          </p>

          <ul className="flex flex-wrap gap-2 mt-2">
            <a
              href="https://haume.me"
              target="_blank"
              className="px-4 sm:px-5 h-9 sm:h-10 text-sm sm:text-base flex items-center justify-center bg-white/5 hover:bg-white/10 border border-transparent ease-in-out duration-300 hover:border-white/20 rounded-xl"
            >
              Website
            </a>
            <a
              href="https://github.com/haume0"
              target="_blank"
              className="px-4 sm:px-5 h-9 sm:h-10 text-sm sm:text-base flex items-center justify-center bg-white/5 hover:bg-white/10 border border-transparent ease-in-out duration-300 hover:border-white/20 rounded-xl"
            >
              Github
            </a>
            <a
              href="https://behance.net/haume"
              target="_blank"
              className="px-4 sm:px-5 h-9 sm:h-10 text-sm sm:text-base flex items-center justify-center bg-white/5 hover:bg-white/20 border border-transparent ease-in-out duration-300 hover:border-white/20 rounded-xl"
            >
              Behance
            </a>
          </ul>
        </main>
        {/* On lg the clock stays in the column flow, so it is centered on the
            screen horizontally and sits in the middle of the space between
            the intro and the radio; nothing can overlap it on short screens.
            The radio grows to the intro's width (18rem tall at 16:9) and
            shrinks first on short screens, leaving that space to the clock. */}
        <span className="snap-center flex justify-center w-full lg:w-auto lg:m-auto">
          <Clock />
        </span>
        <Radio radios={radios} />
      </span>
    </div>
  );
}
