"use client";
import useBackground from "@/store/background";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
function urlToEmbed(url: string) {
  const videoId = url.split("v=")[1];
  return `https://www.youtube.com/embed/${videoId}?si=jMY8kVmD5WQiQ6aP`;
}
function embedToUrl(embed: string) {
  const videoId = embed.split("embed/")[1];
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export default function Radio(props: { radios: string[] }) {
  const [isClient, setClient] = useState(false);
  const background = useBackground();
  const [change, setChange] = useState(false);
  const [url, setUrl] = useState(
    urlToEmbed(props.radios[Math.floor(Math.random() * props.radios.length)]),
  );
  useEffect(() => {
    const localRadio = localStorage.getItem("radio");
    if (localRadio) {
      setUrl(localRadio);
    }
    setClient(true);
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest(`.changeModal`)) {
        setChange(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    localStorage.setItem("radio", url);
    localStorage.setItem("background", background.state.toString());
  }, [url, background.state]);
  return (
    <motion.div
      layout
      className={`group bgblur-4 flex flex-col bg-black/20 size-max border-[1px] border-black/20 ${
        background.state
          ? "w-screen h-screen fixed left-0 top-0"
          : "relative p-2 flex-grow overflow-hidden h-full rounded-2xl aspect-[5/4]"
      }`}
    >
      {background.state && (
        <div
          id="bgblock"
          className="w-full bgmodeblur ease-smooth duration-300 font-jetbrains-mono font-extralight group active:hover:!delay-0 z-50 group-hover:delay-[800ms] text-base sm:text-lg md:text-xl text-center active:bg-purple-500/20 flex items-end justify-center text-transparent active:text-purple-200 active:border-purple-500/40 border-b-2 border-transparent h-[calc(100%-6rem)] absolute"
        >
          You are in background mode. <br />
          Use the area that is not purple when clicked to interact with video.
        </div>
      )}
      {isClient && (
        <motion.iframe
          layout
          className={`size-full relative overflow-hidden ${
            background.state ? "" : "rounded-xl"
          }`}
          src={`${url}`}
          // src={`${url}&autoplay=1`}
          onError={(e) => {
            e.preventDefault();
            console.error("An error occurred while loading the iframe.");
          }}
        ></motion.iframe>
      )}
      <motion.span
        className={`absolute p-4 size-max right-0 justify-end z-50 flex gap-2 ${
          background.state
            ? " flex-wrap-reverse items-end w-full bottom-0 md:top-0 max-w-[36rem]"
            : " flex-row w-full top-0"
        }`}
      >
        <AnimatePresence mode="wait">
          {!change ? (
            <>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: 0.2,
                }}
              >
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (e.shiftKey) {
                      const currentIndex = props.radios.findIndex(
                        (radio) => urlToEmbed(radio) === url,
                      );
                      const nextIndex = currentIndex + 1;
                      if (nextIndex < props.radios.length) {
                        setUrl(urlToEmbed(props.radios[nextIndex]));
                      } else {
                        setUrl(urlToEmbed(props.radios[0]));
                      }
                    } else {
                      setUrl(
                        urlToEmbed(
                          props.radios[
                            Math.floor(Math.random() * props.radios.length)
                          ],
                        ),
                      );
                    }
                  }}
                  title="Shuffle the radios or go to the next radio if shift is held."
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
                </motion.button>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: 0.1,
                }}
              >
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setChange(!change);
                  }}
                  title="Change the radio."
                  className="bgblur-4 size-10 flex items-center justify-center bg-white/10 hover:bg-white/20 border-[1px] border-transparent ease-in-out hover:border-white/20 rounded-xl duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M442.8 99.6l-30.4-30.4c-7-6.9-18.2-6.9-25.1 0L355.5 101l55.5 55.5 31.8-31.7c6.9-7.1 6.9-18.3 0-25.2z"
                      fill="currentColor"
                    />
                    <path
                      d="M346.1 110.5L174.1 288 160 352l64-14.1 176.6-173z"
                      fill="currentColor"
                    />
                    <path
                      d="M384 256v150c0 5.1-3.9 10.1-9.2 10.1s-269-.1-269-.1c-5.6 0-9.8-5.4-9.8-10V138c0-5 4.7-10 10.6-10H256l32-32H87.4c-13 0-23.4 10.3-23.4 23.3v305.3c0 12.9 10.5 23.4 23.4 23.4h305.3c12.9 0 23.3-10.5 23.3-23.4V224l-32 32z"
                      fill="currentColor"
                    />
                  </svg>
                </motion.button>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: 0,
                }}
              >
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    background.toggle();
                  }}
                  className="bgblur-4 size-10 flex items-center justify-center bg-white/10 hover:bg-white/20 border-[1px] border-transparent ease-in-out hover:border-white/20 rounded-xl duration-300"
                  title="Toggle background mode."
                >
                  {background.state ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                        d="M304 416V304h112m-101.8 10.23L432 432M208 96v112H96m101.8-10.23L80 80m336 128H304V96m10.23 101.8L432 80M96 304h112v112m-10.23-101.8L80 432"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="32"
                        d="M432 320v112H320m101.8-10.23L304 304M80 192V80h112M90.2 90.23L208 208M320 80h112v112M421.77 90.2L304 208M192 432H80V320m10.23 101.8L208 304"
                      />
                    </svg>
                  )}
                </motion.button>
              </motion.span>
            </>
          ) : (
            <motion.form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const video = (
                  form.elements.namedItem("video") as HTMLInputElement
                ).value;
                const youtubeRegex =
                  /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
                if (youtubeRegex.test(video)) {
                  setUrl(urlToEmbed(video));
                  setChange(false);
                } else {
                  alert("Please enter a valid YouTube video URL.");
                }
              }}
              key="form"
              className="changeModal bgblur-4 relative w-full max-w-[24rem] flex gap-2"
            >
              <motion.span
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  transformOrigin: "right center",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transformOrigin: "right center",
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  transformOrigin: "right center",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0.2,
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setChange(false);
                  }}
                  className="bgblur-4 size-10 flex items-center justify-center bg-white/10 hover:bg-white/20 border-[1px] border-transparent ease-in-out hover:border-white/20 rounded-xl duration-300"
                  title="Change radio."
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4"
                    viewBox="0 0 48 48"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                    >
                      <path d="m13 8l-7 6l7 7" />
                      <path d="M6 14h22.994c6.883 0 12.728 5.62 12.996 12.5c.284 7.27-5.723 13.5-12.996 13.5H11.998" />
                    </g>
                  </svg>
                </button>
              </motion.span>
              <motion.span
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  transformOrigin: "right center",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transformOrigin: "right center",
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  transformOrigin: "right center",
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: 0.1,
                }}
                className="w-full"
              >
                <input
                  defaultValue={embedToUrl(url)}
                  type="text"
                  name="video"
                  placeholder="Enter a YouTube video URL."
                  className="px-3 w-full bgblur-4 rounded-xl h-10 bg-white/10 focus:bg-white/20 border-[1px] border-transparent ease-in-out focus:border-white/20 outline-none duration-300"
                />
              </motion.span>
              <motion.span
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  transformOrigin: "right center",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transformOrigin: "right center",
                }}
                exit={{
                  opacity: 0,
                  scale: 0.8,
                  transformOrigin: "right center",
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: 0,
                }}
              >
                <button
                  className="px-5 bgblur-4 size-max h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 border-[1px] border-transparent ease-in-out hover:border-white/20 rounded-xl duration-300"
                  title="Change radio."
                >
                  Enter
                </button>
              </motion.span>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.span>
    </motion.div>
  );
}
