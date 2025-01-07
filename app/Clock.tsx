"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useRef } from "react";

type Mode = "pomodoro" | "shortBreak" | "longBreak";

export default function Clock() {
  const minutes: Record<Mode, number> = {
    pomodoro: 1,
    shortBreak: 1,
    longBreak: 1,
  };
  const [auto, setAuto] = useState({
    state: false,
    goal: 2,
    current: 0,
  });
  const [mode, setMode] = useState<Mode>("pomodoro");
  const [clock, setClock] = useState({
    Minute: minutes["pomodoro"],
    Second: 0,
  });
  const [isRunning, setIsRunning] = useState(false);
  const [remainingTime, setRemainingTime] = useState(
    minutes["pomodoro"] * 60 * 1000,
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
          (newRemainingTime % (1000 * 60 * 60)) / (1000 * 60),
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
            (newRemainingTime % (1000 * 60 * 60)) / (1000 * 60),
          );
          const secondsRemaining = Math.floor(
            (newRemainingTime % (1000 * 60)) / 1000,
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
        className="min-w-96 w-full bgblur-4 relative z-10 max-w-[36rem] size-max p-2 flex flex-col gap-2 rounded-2xl bg-black/20 border-[1px] border-black/20"
      >
        <motion.span layout="position" className="flex w-full gap-2">
          <button
            onClick={() => handleModeChange("pomodoro")}
            className={`px-6 h-12 text-xl font-jetbrains-mono flex items-center justify-center bg-white/5 hover:bg-white/10 border-[1px] border-transparent ease-in-out duration-300 hover:border-white/20 rounded-xl ${mode == "pomodoro" && "!bg-white/20 !border-white/20"}`}
          >
            Pomodoro
          </button>
          <button
            onClick={() => handleModeChange("shortBreak")}
            className={`px-6 h-12 text-xl font-jetbrains-mono flex items-center justify-center bg-white/5 hover:bg-white/10 border-[1px] border-transparent ease-in-out duration-300 hover:border-white/20 rounded-xl ${mode == "shortBreak" && "!bg-white/20 !border-white/20"}`}
          >
            Short Break
          </button>
          <button
            onClick={() => handleModeChange("longBreak")}
            className={`px-6 h-12 text-xl font-jetbrains-mono flex items-center justify-center bg-white/5 hover:bg-white/10 border-[1px] border-transparent ease-in-out duration-300 hover:border-white/20 rounded-xl ${mode == "longBreak" && "!bg-white/20 !border-white/20"}`}
          >
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
              className="flex gap-1 items-center justify-center w-full"
            >
              <button className="size-8 flex items-center justify-center bg-white/5 hover:bg-white/10 border-[1px] border-transparent ease-in-out duration-300 hover:border-white/20 rounded-lg">
                -
              </button>
              <p className=" font-jetbrains-mono text-lg font-extralight">
                {auto.current}/{auto.goal}
              </p>
              <button className="size-8 flex items-center justify-center bg-white/5 hover:bg-white/10 border-[1px] border-transparent ease-in-out duration-300 hover:border-white/20 rounded-lg">
                +
              </button>
            </motion.span>
          )}
        </AnimatePresence>
        <motion.span layout="position" className="flex -space-x-2 mx-auto">
          <h1 className=" font-jetbrains-mono pointer-events-none text-9xl font-extrabold tracking-[-0.6rem]">
            {clock.Minute < 10 ? `0${clock.Minute}` : clock.Minute}
          </h1>
          <h1 className=" font-jetbrains-mono text-9xl font-extrabold tracking-[-0.6rem]">
            :
          </h1>
          <h1 className=" font-jetbrains-mono text-9xl font-extrabold tracking-[-0.6rem]">
            {clock.Second < 10 ? `0${clock.Second}` : clock.Second}
          </h1>
        </motion.span>
        <motion.span
          layout="position"
          className="flex justify-center w-full gap-2"
        >
          <button
            onClick={() => {
              setAuto({
                ...auto,
                state: !auto.state,
              });
            }}
            className={`h-16 w-28 rounded-[1.5rem] p-1 flex bg-white/5 hover:bg-white/10 border-[2px] border-transparent ease-in-out duration-300 hover:border-white/20 ${auto.state ? "justify-end" : ""}`}
          >
            <motion.div
              layout
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 450,
              }}
              className="h-full rounded-[1.2rem] aspect-square bg-white"
            ></motion.div>
          </button>
          <button
            onClick={resetTimer}
            className={`size-16 text-3xl font-jetbrains-mono flex group items-center justify-center bg-white/5 hover:bg-white/10 border-[2px] border-transparent ease-in-out duration-300 hover:border-white/20 rounded-[1.5rem]`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-9 ease-smooth group-active:rotate-[-360deg] duration-700 group-active:transition-none`}
              viewBox="0 0 512 512"
            >
              <path
                d="M433 288.8c-7.7 0-14.3 5.9-14.9 13.6-6.9 83.1-76.8 147.9-161.8 147.9-89.5 0-162.4-72.4-162.4-161.4 0-87.6 70.6-159.2 158.2-161.4 2.3-.1 4.1 1.7 4.1 4v50.3c0 12.6 13.9 20.2 24.6 13.5L377 128c10-6.3 10-20.8 0-27.1l-96.1-66.4c-10.7-6.7-24.6.9-24.6 13.5v45.7c0 2.2-1.7 4-3.9 4C148 99.8 64 184.6 64 288.9 64 394.5 150.1 480 256.3 480c100.8 0 183.4-76.7 191.6-175.1.8-8.7-6.2-16.1-14.9-16.1z"
                fill="currentColor"
              />
            </svg>
          </button>
          <button
            onClick={isRunning ? pauseTimer : startTimer}
            className={`w-40 h-16 text-3xl font-jetbrains-mono flex items-center justify-center bg-white/5 hover:bg-white/10 border-[2px] border-transparent ease-in-out duration-300 hover:border-white/20 rounded-[1.5rem] ${
              isRunning &&
              "!bg-blue-500/20 hover:!bg-yellow-500/30 hover:!border-yellow-500/30 group/running"
            }`}
          >
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
