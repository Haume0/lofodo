"use client";
import useBackground from "@/store/background";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { getVideoId, loadYouTubeApi, PlayerState, YTPlayer } from "./youtube";

function randomVideoId(radios: string[]) {
  return getVideoId(radios[Math.floor(Math.random() * radios.length)] ?? "");
}

const controlButton =
  "bgblur-4 size-10 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-transparent ease-in-out hover:border-white/20 rounded-xl duration-300 disabled:opacity-50 disabled:pointer-events-none";

// Toolbar items pop in and out one after another; each one's delay sets its
// place in that order.
function PopIn(props: {
  delay: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: props.delay,
      }}
      className={props.className}
    >
      {props.children}
    </motion.span>
  );
}

export default function Radio(props: { radios: string[] }) {
  const [isClient, setClient] = useState(false);
  const background = useBackground();
  const [change, setChange] = useState(false);
  const [videoId, setVideoId] = useState<string | null>(() =>
    randomVideoId(props.radios),
  );
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const playerContainer = useRef<HTMLDivElement>(null);
  const player = useRef<YTPlayer | null>(null);
  const loadedVideoId = useRef<string | null>(null);
  const videoIdRef = useRef(videoId);

  useEffect(() => {
    const localRadio = localStorage.getItem("radio");
    const localVideoId = localRadio && getVideoId(localRadio);
    if (localVideoId) {
      setVideoId(localVideoId);
    }
    const localVolume = Number(localStorage.getItem("volume"));
    if (localStorage.getItem("volume") !== null && !isNaN(localVolume)) {
      setVolume(Math.min(100, Math.max(0, localVolume)));
    }
    setMuted(localStorage.getItem("muted") === "true");
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
    if (videoId) {
      localStorage.setItem("radio", `https://www.youtube.com/embed/${videoId}`);
    }
    localStorage.setItem("background", background.state.toString());
  }, [videoId, background.state]);
  useEffect(() => {
    if (!isClient) return;
    localStorage.setItem("volume", volume.toString());
    localStorage.setItem("muted", muted.toString());
  }, [isClient, volume, muted]);

  useEffect(() => {
    videoIdRef.current = videoId;
  }, [videoId]);

  // Create the player once; video changes are handled below.
  useEffect(() => {
    const container = playerContainer.current;
    const initialVideoId = videoIdRef.current;
    if (!isClient || !container || !initialVideoId) return;
    let cancelled = false;
    loadYouTubeApi()
      .then((YT) => {
        if (cancelled) return;
        const target = document.createElement("div");
        container.appendChild(target);
        loadedVideoId.current = initialVideoId;
        player.current = new YT.Player(target, {
          videoId: initialVideoId,
          width: "100%",
          height: "100%",
          playerVars: {
            controls: 1,
            disablekb: 1,
            fs: 0,
            rel: 0,
            iv_load_policy: 3,
            playsinline: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (e) => {
              if (cancelled) return;
              const savedVolume = Number(localStorage.getItem("volume") ?? 50);
              e.target.setVolume(isNaN(savedVolume) ? 50 : savedVolume);
              if (localStorage.getItem("muted") === "true") {
                e.target.mute();
              } else {
                e.target.unMute();
              }
              setReady(true);
            },
            onStateChange: (e) => {
              setPlaying(
                e.data === PlayerState.PLAYING ||
                  e.data === PlayerState.BUFFERING,
              );
            },
            onError: (e) => {
              console.error("YouTube player error:", e.data);
            },
          },
        });
      })
      .catch((error) => console.error(error));
    return () => {
      cancelled = true;
      player.current?.destroy();
      player.current = null;
      loadedVideoId.current = null;
      container.innerHTML = "";
      setReady(false);
      setPlaying(false);
    };
  }, [isClient]);

  useEffect(() => {
    if (!ready || !player.current || !videoId) return;
    if (loadedVideoId.current === videoId) return;
    loadedVideoId.current = videoId;
    const state = player.current.getPlayerState();
    if (state === PlayerState.PLAYING || state === PlayerState.BUFFERING) {
      player.current.loadVideoById(videoId);
    } else {
      player.current.cueVideoById(videoId);
    }
  }, [ready, videoId]);

  function togglePlay() {
    if (!player.current || !ready) return;
    if (playing) {
      player.current.pauseVideo();
    } else {
      player.current.playVideo();
    }
  }
  function toggleMute() {
    if (!player.current || !ready) return;
    if (muted || volume === 0) {
      if (volume === 0) {
        setVolume(50);
        player.current.setVolume(50);
      }
      player.current.unMute();
      setMuted(false);
    } else {
      player.current.mute();
      setMuted(true);
    }
  }
  function changeVolume(value: number) {
    setVolume(value);
    if (!player.current || !ready) return;
    player.current.setVolume(value);
    if (muted && value > 0) {
      player.current.unMute();
      setMuted(false);
    }
  }
  const silent = muted || volume === 0;

  // Background mode makes the player `fixed`, which always opens its own
  // stacking context, so the intro and clock cards (z-10) would cover the
  // controls whatever their z-index. There the controls render in the gap
  // below the player instead: on mobile they sit on the video band like the
  // card's toolbar, on lg the gap is `contents` and they go to the corner.
  const controls = (
    <motion.span
      className={`absolute top-0 right-0 size-max w-full justify-end z-50 flex gap-2 pointer-events-none *:pointer-events-auto ${
        background.state
          ? // The gap rarely lines up with the letterboxed video, so the
            // controls carry their own card instead of relying on it. w-96
            // fits the toolbar and the URL form, and keeps lg clear of the
            // intro card.
            "p-2 rounded-2xl bg-black/20 border border-black/20 backdrop-blur-xs lg:fixed lg:top-4 lg:right-4 lg:w-96"
          : "p-3 sm:p-4"
      }`}
    >
      <AnimatePresence mode="wait">
        {!change ? (
          <>
            <span className="flex items-center gap-2 mr-auto">
              <PopIn delay={0.4}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  disabled={!ready}
                  className={controlButton}
                  title={playing ? "Pause." : "Play."}
                >
                  {playing ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M208 432h-48a16 16 0 01-16-16V96a16 16 0 0116-16h48a16 16 0 0116 16v320a16 16 0 01-16 16zM352 432h-48a16 16 0 01-16-16V96a16 16 0 0116-16h48a16 16 0 0116 16v320a16 16 0 01-16 16z"
                        fill="currentColor"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M133 440a35.37 35.37 0 01-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37 7.46-27.53 19.46-34.33a35.13 35.13 0 0135.77.45l247.85 148.36a36 36 0 010 61l-247.89 148.4A35.5 35.5 0 01133 440z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                </button>
              </PopIn>
              <PopIn delay={0.3}>
                <span className="bgblur-4 h-10 flex items-center gap-2 pr-3 bg-white/10 border border-transparent hover:border-white/20 rounded-xl duration-300 ease-in-out">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                    disabled={!ready}
                    className="size-10 flex items-center justify-center disabled:opacity-50"
                    title={silent ? "Unmute." : "Mute."}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M80 192v128h80l112 96V96L160 192H80z"
                        fill="currentColor"
                      />
                      {silent ? (
                        <path
                          d="M352 208l96 96M448 208l-96 96"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="32"
                        />
                      ) : (
                        <path
                          d={
                            volume > 50
                              ? "M336 192c16 16 24 40 24 64s-8 48-24 64M384 144c32 32 48 72 48 112s-16 80-48 112"
                              : "M336 192c16 16 24 40 24 64s-8 48-24 64"
                          }
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="32"
                        />
                      )}
                    </svg>
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={silent ? 0 : volume}
                    disabled={!ready}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => changeVolume(Number(e.target.value))}
                    title="Volume."
                    aria-label="Volume"
                    className="w-16 sm:w-24 accent-white cursor-pointer disabled:opacity-50"
                  />
                </span>
              </PopIn>
            </span>
            <PopIn delay={0.2}>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  if (e.shiftKey) {
                    const currentIndex = props.radios.findIndex(
                      (radio) => getVideoId(radio) === videoId,
                    );
                    const nextIndex = (currentIndex + 1) % props.radios.length;
                    setVideoId(getVideoId(props.radios[nextIndex]));
                  } else {
                    setVideoId(randomVideoId(props.radios));
                  }
                }}
                title="Shuffle the radios or go to the next radio if shift is held."
                className={controlButton}
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
            </PopIn>
            <PopIn delay={0.1}>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  setChange(!change);
                }}
                title="Change the radio."
                className={controlButton}
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
            </PopIn>
            <PopIn delay={0}>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  background.toggle();
                }}
                className={controlButton}
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
            </PopIn>
          </>
        ) : (
          <motion.form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const video = (
                form.elements.namedItem("video") as HTMLInputElement
              ).value;
              const id = getVideoId(video);
              if (id) {
                setVideoId(id);
                setChange(false);
              } else {
                alert("Please enter a valid YouTube video URL.");
              }
            }}
            key="form"
            className="changeModal bgblur-4 relative w-full max-w-[24rem] flex gap-2"
          >
            <PopIn delay={0.2} className="origin-right">
              <button
                type="button"
                onClick={() => {
                  setChange(false);
                }}
                className={controlButton}
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
            </PopIn>
            <PopIn delay={0.1} className="origin-right w-full">
              <input
                defaultValue={
                  videoId ? `https://www.youtube.com/watch?v=${videoId}` : ""
                }
                type="text"
                name="video"
                placeholder="Enter a YouTube video URL."
                className="px-3 w-full bgblur-4 rounded-xl h-10 bg-white/10 focus:bg-white/20 border border-transparent ease-in-out focus:border-white/20 outline-hidden duration-300"
              />
            </PopIn>
            <PopIn delay={0} className="origin-right">
              <button
                className="px-5 bgblur-4 size-max h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 border border-transparent ease-in-out hover:border-white/20 rounded-xl duration-300"
                title="Change radio."
              >
                Enter
              </button>
            </PopIn>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.span>
  );

  return (
    <>
      <motion.div
        layout
        className={`group bgblur-4 flex flex-col bg-black/20 border border-black/20 ${
          background.state
            ? "w-screen h-dvh fixed left-0 top-0"
            : "snap-center relative p-2 overflow-hidden rounded-2xl w-full aspect-video lg:w-auto lg:self-start lg:grow lg:basis-0 lg:min-h-0 lg:max-h-72"
        }`}
      >
        {isClient && (
          <motion.div
            layout
            className={`size-full relative overflow-hidden ${
              background.state ? "" : "rounded-xl"
            }`}
          >
            <div
              ref={playerContainer}
              className="size-full [&_iframe]:size-full"
            />
            {/* Blocks the video except the bottom strip, where YouTube's own
              progress bar lives. */}
            {background.state ? (
              <div
                id="bgblock"
                className="w-full bgmodeblur ease-smooth duration-300 font-jetbrains-mono font-extralight active:hover:delay-0! z-40 text-base sm:text-lg md:text-xl text-center active:bg-purple-500/20 flex items-end justify-center text-transparent active:text-purple-200 active:border-purple-500/40 border-b-2 border-transparent h-[calc(100%-110px)] absolute top-0 left-0"
              >
                You are in background mode. <br />
                Use the area that is not purple when clicked to interact with
                video.
              </div>
            ) : (
              <div
                onClick={togglePlay}
                className="w-full h-[calc(100%-110px)] absolute top-0 left-0 cursor-pointer"
              ></div>
            )}
          </motion.div>
        )}
        {!background.state && controls}
      </motion.div>
      {/* Going fixed drops the player out of the mobile stack, so the scroll
          ends on the clock and the middle of the video stays covered. This
          video-sized gap gives that snap stop back; taps pass through to the
          video. A full-screen gap would force a scroll in portrait even when
          the video is already in view. lg shows the video behind the cards. */}
      {background.state && (
        <div className="relative w-full max-w-screen aspect-video shrink-0 snap-center pointer-events-none lg:contents">
          {controls}
        </div>
      )}
    </>
  );
}
