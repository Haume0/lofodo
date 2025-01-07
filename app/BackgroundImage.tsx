"use client";
import { Background } from "@/actions/backgrounds";
import useBackground from "@/store/background";
import { useEffect } from "react";
export default function BackgroundImage(props: { backgrounds: Background[] }) {
  const background = useBackground();
  const randomBackground = () =>
    props.backgrounds[Math.floor(Math.random() * props.backgrounds.length)];
  useEffect(() => {
    const backgroundGif = localStorage.getItem("backgroundGif");
    const powerMode = localStorage.getItem("backgroundPowerMode");
    if (backgroundGif) {
      background.setGift(backgroundGif);
    } else {
      const rng = randomBackground().image;
      background.setGift(rng);
      localStorage.setItem("backgroundGif", rng);
    }
    if (powerMode) {
      useBackground.setState({ savePower: powerMode === "true" });
    }
  }, []);
  return (
    background.gif &&
    !background.state && (
      <>
        <div className="absolute size-full left-0 top-0">
          {!background.savePower && (
            <img
              src={background.gif}
              className="size-full absolute object-cover object-center left-0 top-0 -z-10 blur"
              loading="eager"
              alt="Blurred background image"
            />
          )}
          <img
            src={background.gif}
            className={`size-full object-center ${!background.savePower ? "object-contain" : "object-cover"}`}
            loading="eager"
            alt="Background image"
          />
        </div>
        <span
          className={`absolute p-4 right-0 top-0 justify-end z-50 flex gap-2`}
        >
          <button
            onClick={() => {
              const rng = randomBackground().image;
              background.setGift(rng);
              localStorage.setItem("backgroundGif", rng);
            }}
            title="Shuffle the background."
            className="size-10 bgblur-4 flex items-center justify-center bg-white/10 hover:bg-white/20 border-[1px] border-transparent ease-in-out hover:border-white/20 rounded-xl duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5"
              viewBox="0 0 512 512"
            >
              <path
                d="M365.419 152h13.81l-50.738 41.584 20.308 24.572L448 136l-99.136-84-20.368 24.978L379.679 120h-14.26c-103.727 0-146.494 79.62-180.857 143.727-1.362 2.542-2.715 4.99-4.06 7.488l-.059.095c-1.591 2.953-3.176 6.114-4.76 9.038-35.562 65.63-66.893 83.214-111.684 83.641V396c37.625 0 57.563-9.451 72.236-18.178 24.935-14.831 47.042-44.559 67.583-82.467 1.541-2.844 3.083-5.752 4.632-8.626l.225-.438c1.459-2.711 2.922-5.273 4.39-8.014C246.369 216.113 280.808 152 365.419 152z"
                fill="currentColor"
              />
              <path
                d="M348.798 293.844l-20.308 24.572L379.229 360h-13.81c-70.728 0-106.396-44.801-135.649-95.812l-17.648 32.618C243.556 346.626 287.116 392 365.419 392h14.26l-51.183 43.022L348.864 460 448 376l-99.202-82.156z"
                fill="currentColor"
              />
              <path
                d="M175.684 231.652c1.584 2.924 3.169 6.085 4.76 9.038l.059.095c1.218 2.262 2.442 4.49 3.675 6.777 5.82-10.73 11.98-21.748 18.695-32.649-20.273-37.079-42.083-66.132-66.636-80.735C121.563 125.451 101.625 116 64 116v32.011c44.791.427 76.122 18.011 111.684 83.641z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button
            onClick={() => {
              background.togglePowerMode();
            }}
            title="Shuffle the background."
            className="size-10 bgblur-4 flex items-center justify-center bg-white/10 hover:bg-white/20 border-[1px] border-transparent ease-in-out hover:border-white/20 rounded-xl duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 ${
                !background.savePower ? "text-white" : "text-yellow-500"
              }`}
              viewBox="0 0 512 512"
            >
              <rect
                width="400"
                height="224"
                x="32"
                y="144"
                fill="none"
                stroke="currentColor"
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth="32"
                rx="45.7"
                ry="45.7"
              />
              <rect
                width="292.63"
                height="114.14"
                x="85.69"
                y="198.93"
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth="32"
                rx="4"
                ry="4"
              />
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit="10"
                strokeWidth="32"
                d="M480 218.67v74.66"
              />
            </svg>
          </button>
        </span>
      </>
    )
  );
}