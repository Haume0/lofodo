"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useRef } from "react";

type Mode = "pomodoro" | "shortBreak" | "longBreak";

export default function Clock() {
  const minutes: Record<Mode, number> = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  };
  const [auto, setAuto] = useState(() => {
    if (typeof window !== "undefined") {
      const storedAuto = localStorage.getItem("auto");
      return storedAuto
        ? JSON.parse(storedAuto)
        : {
            state: false,
            goal: 2,
            current: 0,
          };
    } else {
      return {
        state: false,
        goal: 2,
        current: 0,
      };
    }
  });
  const [mode, setMode] = useState<Mode>("pomodoro");
  const [clock, setClock] = useState({
    Minute: minutes["pomodoro"],
    Second: 0,
  });
  const [isRunning, setIsRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(
    minutes["pomodoro"] * 60 * 1000
  );
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const alarm = globalThis.window && new Audio("/alarm.wav");
  const start = globalThis.window && new Audio("/click_on.wav");
  const pause = globalThis.window && new Audio("/click_off.wav");

  const handleTimeUp = () => {
    alarm.play().catch((error) => {
      if (error.name === "NotAllowedError") {
        console.error("Alarm sound play request was denied.");
      }
    });
    // The alarm is enough while the user looks at the page; notify only when
    // they are in another tab or app. Shown through the service worker since
    // Android and installed PWAs reject `new Notification()`.
    if (
      !document.hasFocus() &&
      "Notification" in window &&
      Notification.permission === "granted"
    ) {
      navigator.serviceWorker?.getRegistration("/sw/").then((registration) =>
        registration?.showNotification(
          mode === "pomodoro" ? "Time for a break" : "Back to focus",
          {
            body:
              mode === "pomodoro"
                ? "Focus session done, take a breather."
                : "Break is over, next pomodoro is ready.",
            icon: "/icons/icon-192.png",
            tag: "lofodo-timer",
          },
        ),
      );
    }
    const newCurrent = auto.current + 1;
    if (mode === "pomodoro" && auto.current < auto.goal) {
      setAuto({
        ...auto,
        current: newCurrent,
      });
      setMode("shortBreak");
      setClock({ Minute: minutes.shortBreak, Second: 0 });
      setRemainingTime(minutes.shortBreak * 60 * 1000);
    } else if (mode === "pomodoro" && auto.current >= auto.goal) {
      setAuto({
        ...auto,
        current: 0,
      });
      setMode("longBreak");
      setClock({ Minute: minutes.longBreak, Second: 0 });
      setRemainingTime(minutes.longBreak * 60 * 1000);
    } else if (mode === "longBreak" && auto.current >= auto.goal) {
      setMode("pomodoro");
      setClock({ Minute: minutes.pomodoro, Second: 0 });
      setRemainingTime(minutes.pomodoro * 60 * 1000);
    } else {
      setMode("pomodoro");
      setClock({ Minute: minutes.pomodoro, Second: 0 });
      setRemainingTime(minutes.pomodoro * 60 * 1000);
    }
  };

  const startTimer = () => {
    start?.play().catch((error) => {
      if (error.name === "NotAllowedError") {
        console.error("Start sound play request was denied.");
      }
    });
    // Asked here because browsers only show the permission prompt on a user action.
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
    if (!isRunning) {
      const startTime = Date.now();
      sessionStorage.setItem("startTime", startTime.toString());
      const endTime = startTime + remainingTime;
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        const currentTime = Date.now();
        const newRemainingTime = endTime - currentTime;
        setRemainingTime(newRemainingTime);
        const minutes = Math.floor(
          (newRemainingTime % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((newRemainingTime % (1000 * 60)) / 1000);
        setClock({ Minute: minutes, Second: seconds });

        if (newRemainingTime <= 0) {
          clearInterval(timerRef.current!);
          setIsRunning(false);
          handleTimeUp();
        }
      }, 1000);
    }
  };

  const pauseTimer = () => {
    pause?.play().catch((error) => {
      if (error.name === "NotAllowedError") {
        console.error("Pause sound play request was denied.");
      }
    });
    if (isRunning) {
      clearInterval(timerRef.current!);
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    pause?.play().catch((error) => {
      if (error.name === "NotAllowedError") {
        console.error("Pause sound play request was denied.");
      }
    });
    clearInterval(timerRef.current!);
    setClock({ Minute: minutes[mode], Second: 0 });
    setRemainingTime(minutes[mode] * 60 * 1000);
    setIsRunning(false);
    sessionStorage.removeItem("startTime");
  };

  useEffect(() => {
    const storedStartTime = sessionStorage.getItem("startTime");
    if (storedStartTime) {
      const elapsedTime = Date.now() - parseInt(storedStartTime, 10);
      if (elapsedTime < minutes[mode] * 60 * 1000) {
        setRemainingTime(minutes[mode] * 60 * 1000 - elapsedTime);
        setIsRunning(true);
        timerRef.current = setInterval(() => {
          const currentTime = Date.now();
          const newRemainingTime =
            minutes[mode] * 60 * 1000 -
            (currentTime - parseInt(storedStartTime, 10));
          setRemainingTime(newRemainingTime);
          const minutesRemaining = Math.floor(
            (newRemainingTime % (1000 * 60 * 60)) / (1000 * 60)
          );
          const secondsRemaining = Math.floor(
            (newRemainingTime % (1000 * 60)) / 1000
          );
          setClock({ Minute: minutesRemaining, Second: secondsRemaining });

          if (newRemainingTime <= 0) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            handleTimeUp();
          }
        }, 1000);
      } else {
        sessionStorage.removeItem("startTime");
      }
    }
    return () => clearInterval(timerRef.current!);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("auto", JSON.stringify(auto));
  }, [auto]);

  useEffect(() => {
    // Scope points at a path no page lives on, so the worker never controls a
    // page and the browser never re-fetches /sw.js on navigations. Otherwise,
    // other projects run later on the same localhost port keep requesting it.
    // Showing notifications doesn't need the page to be controlled.
    navigator.serviceWorker?.register("/sw.js", { scope: "/sw/" });
  }, []);

  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    resetTimer();
    setClock({ Minute: minutes[newMode], Second: 0 });
    setRemainingTime(minutes[newMode] * 60 * 1000);
  };

  return (
    <>
      <motion.div
        layoutId="ehe"
        layout="size"
        className="w-full lg:w-max h-max bgblur-4 relative z-10 max-w-xl p-2 flex flex-col gap-2 rounded-2xl bg-black/20 border border-black/20">
        <motion.span layout="position" className="flex w-full gap-1.5 sm:gap-2">
          <button
            onClick={() => handleModeChange("pomodoro")}
            className={`flex-1 min-w-0 lg:flex-none whitespace-nowrap px-1 sm:px-6 h-10 sm:h-12 text-[0.8rem] sm:text-xl font-jetbrains-mono flex items-center justify-center bg-white/5 hover:bg-white/10 border border-transparent ease-in-out duration-300 hover:border-white/20 rounded-xl ${
              mode == "pomodoro" && "bg-white/20! border-white/20!"
            }`}>
            Pomodoro
          </button>
          <button
            onClick={() => handleModeChange("shortBreak")}
            className={`flex-1 min-w-0 lg:flex-none whitespace-nowrap px-1 sm:px-6 h-10 sm:h-12 text-[0.8rem] sm:text-xl font-jetbrains-mono flex items-center justify-center bg-white/5 hover:bg-white/10 border border-transparent ease-in-out duration-300 hover:border-white/20 rounded-xl ${
              mode == "shortBreak" && "bg-white/20! border-white/20!"
            }`}>
            Short Break
          </button>
          <button
            onClick={() => handleModeChange("longBreak")}
            className={`flex-1 min-w-0 lg:flex-none whitespace-nowrap px-1 sm:px-6 h-10 sm:h-12 text-[0.8rem] sm:text-xl font-jetbrains-mono flex items-center justify-center bg-white/5 hover:bg-white/10 border border-transparent ease-in-out duration-300 hover:border-white/20 rounded-xl ${
              mode == "longBreak" && "bg-white/20! border-white/20!"
            }`}>
            Long Break
          </button>
        </motion.span>
        <AnimatePresence>
          {auto.state && (
            <motion.span
              key="ehe"
              initial={{ opacity: 0, maxHeight: 0 }}
              animate={{ opacity: 1, maxHeight: 56 }}
              exit={{ opacity: 0, maxHeight: 0 }}
              transition={{ duration: 0.5 }}
              className="flex gap-1 items-center justify-center w-full">
              <button
                onClick={() => {
                  setAuto({
                    ...auto,
                    current: 0,
                  });
                }}
                className="size-8 group flex items-center justify-center bg-white/5 hover:bg-white/10 border border-transparent ease-in-out duration-300 hover:border-white/20 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 ease-smooth group-active:rotate-[-360deg] duration-700 group-active:transition-none`}
                  viewBox="0 0 512 512">
                  <path
                    d="M433 288.8c-7.7 0-14.3 5.9-14.9 13.6-6.9 83.1-76.8 147.9-161.8 147.9-89.5 0-162.4-72.4-162.4-161.4 0-87.6 70.6-159.2 158.2-161.4 2.3-.1 4.1 1.7 4.1 4v50.3c0 12.6 13.9 20.2 24.6 13.5L377 128c10-6.3 10-20.8 0-27.1l-96.1-66.4c-10.7-6.7-24.6.9-24.6 13.5v45.7c0 2.2-1.7 4-3.9 4C148 99.8 64 184.6 64 288.9 64 394.5 150.1 480 256.3 480c100.8 0 183.4-76.7 191.6-175.1.8-8.7-6.2-16.1-14.9-16.1z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  if (auto.goal <= 1) {
                    setAuto({
                      ...auto,
                      goal: 1,
                    });
                    return;
                  }
                  setAuto({
                    ...auto,
                    goal: auto.goal - 1,
                  });
                  if (auto.current >= auto.goal) {
                    setAuto({
                      ...auto,
                      goal: auto.goal - 1,
                      current: auto.goal - 1,
                    });
                  }
                }}
                className="size-8 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-transparent ease-in-out duration-300 hover:border-white/20 rounded-lg">
                -
              </button>
              <p className=" font-jetbrains-mono pointer-events-none text-lg font-extralight">
                {auto.current}/{auto.goal}
              </p>
              <button
                onClick={() => {
                  setAuto({
                    ...auto,
                    goal: auto.goal + 1,
                  });
                }}
                className="size-8 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-transparent ease-in-out duration-300 hover:border-white/20 rounded-lg">
                +
              </button>
              <button
                className="hidden"
                onClick={() => {
                  setAuto({
                    ...auto,
                    current: auto.current + 1,
                  });
                }}>
                C+
              </button>
            </motion.span>
          )}
        </AnimatePresence>
        <motion.span
          layout="position"
          className="flex pointer-events-none -space-x-2 mx-auto">
          <h1 className=" font-jetbrains-mono text-[5.5rem] leading-none sm:text-9xl font-extrabold tracking-[-0.4rem] sm:tracking-[-0.6rem]">
            {clock.Minute < 10 ? `0${clock.Minute}` : clock.Minute}
          </h1>
          <h1 className=" font-jetbrains-mono text-[5.5rem] leading-none sm:text-9xl font-extrabold tracking-[-0.4rem] sm:tracking-[-0.6rem]">
            :
          </h1>
          <h1 className=" font-jetbrains-mono text-[5.5rem] leading-none sm:text-9xl font-extrabold tracking-[-0.4rem] sm:tracking-[-0.6rem]">
            {clock.Second < 10 ? `0${clock.Second}` : clock.Second}
          </h1>
        </motion.span>
        <motion.span
          layout="position"
          className="flex justify-center w-full gap-2">
          <button
            onClick={() => {
              setAuto({
                ...auto,
                state: !auto.state,
              });
            }}
            className={`h-14 w-24 sm:h-16 sm:w-28 rounded-[1.25rem] sm:rounded-3xl p-1 flex bg-white/5 hover:bg-white/10 border-2 border-transparent ease-in-out duration-300 hover:border-white/20 ${
              auto.state ? "justify-end" : ""
            }`}>
            <motion.div
              layout
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 450,
              }}
              className="h-full rounded-2xl sm:rounded-[1.2rem] aspect-square bg-white"></motion.div>
          </button>
          <button
            onClick={resetTimer}
            className={`size-14 sm:size-16 text-3xl font-jetbrains-mono flex group items-center justify-center bg-white/5 hover:bg-white/10 border-2 border-transparent ease-in-out duration-300 hover:border-white/20 rounded-[1.25rem] sm:rounded-3xl`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-8 sm:h-9 ease-smooth group-active:rotate-[-360deg] duration-700 group-active:transition-none`}
              viewBox="0 0 512 512">
              <path
                d="M433 288.8c-7.7 0-14.3 5.9-14.9 13.6-6.9 83.1-76.8 147.9-161.8 147.9-89.5 0-162.4-72.4-162.4-161.4 0-87.6 70.6-159.2 158.2-161.4 2.3-.1 4.1 1.7 4.1 4v50.3c0 12.6 13.9 20.2 24.6 13.5L377 128c10-6.3 10-20.8 0-27.1l-96.1-66.4c-10.7-6.7-24.6.9-24.6 13.5v45.7c0 2.2-1.7 4-3.9 4C148 99.8 64 184.6 64 288.9 64 394.5 150.1 480 256.3 480c100.8 0 183.4-76.7 191.6-175.1.8-8.7-6.2-16.1-14.9-16.1z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button
            onClick={isRunning ? pauseTimer : startTimer}
            className={`w-32 h-14 text-2xl sm:w-40 sm:h-16 sm:text-3xl font-jetbrains-mono flex items-center justify-center bg-white/5 hover:bg-white/10 border-2 border-transparent ease-in-out duration-300 hover:border-white/20 rounded-[1.25rem] sm:rounded-3xl ${
              isRunning &&
              "bg-blue-500/20! hover:bg-yellow-500/30! hover:border-yellow-500/30! group/running"
            }`}>
            <span className="group-hover/running:hidden">
              {isRunning ? "Ticking" : "Start"}
            </span>
            <span className="hidden group-hover/running:block">
              {isRunning ? "Pause" : "Start"}
            </span>
          </button>
        </motion.span>
      </motion.div>
    </>
  );
}
