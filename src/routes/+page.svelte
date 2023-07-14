<script lang="ts">
  import { browser } from "$app/environment";
import data from "../data.json";
let bg = {
  current: data.bg[4],
};
let options = {
  music: "",
  pomodoro: 15,
  sBreak: 3,
  lBreak: 9,
  autoBreak: false,
  pomoCount: 0,
  pomoGoal:3,
};
let sounds = {}
if(!browser){sounds = {}}
if(browser){
  sounds = {
  start: new Audio('/click_on.wav'),
  pause: new Audio('/click_off.wav'),
  bell: new Audio('/alarm.wav')
}
}
let interval;
let time = {
  min: 0,
  sec: 0,
};
let mode = options.pomodoro;
let activeMode = options.pomodoro;
let state = false;
let clock = {
  startTimer() {
    if(!browser)return
    sounds.start.play()
    state = true;
    clearInterval(interval!);
    interval = setInterval(() => {
      if (mode > 0) {
        mode--;
        state = true;
      } else {
        options.pomoCount++;
        state = false;
        sounds.bell.play()
        clearInterval(interval!);
      }
    }, 1000);
  },
  pauseTimer() {
    if(!browser)return
    sounds.pause.play()
    clearInterval(interval!);
    state = false;
  },
  resetTimer() {
    mode = activeMode;
  },
  selectMode(arg: number) {
    mode = arg;
    activeMode = arg;
  },
};
$: time = {
  sec: mode % 60,
  min: Math.floor(mode / 60),
};
</script>
<svelte:head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Lofodo</title>
  <meta name="description" content="Gelişmiş bir çalışma stratejisi, dikkatini en iyi şekilde toplaman için bire bir.">
  <meta name="author" content="Haume">
  <meta name="copyright" content="Haume">
  <meta name="robots" content="index, follow">
  <meta name="rating" content="general">
</svelte:head>
<div class="relative flex w-screen h-screen items-center justify-center">
  <div
    id="background"
    class="w-screen bg-black absolute left-0 top-0 select-none h-[100svh]"
  >
    <img
      src={bg.current}
      alt=""
      class="absolute w-full object-center h-full object-cover blur-[100px]"
    />
    <img
      src={bg.current}
      alt=""
      class="absolute w-full h-full md:object-contain sm:object-none sm:object-center"
    />
  </div>
  <main class="absolute left-8 bg-black/40 rounded-2xl p-4 top-8">
    <h1 class="text-6xl font-extrabold text-white">LOFODO</h1>
    <h2 class="text-pink-400 font-thin">A project by 
      <a href="https://github.com/Haume0" target="_blank" class="font-medium hover:underline underline-offset-4" rel="noreferrer">Haume</a>
    </h2>
    <p class="text-white font-thin">Customizable, advanced focusing application.</p>
  </main>
  <section
    id="clock"
    class="bg-black/40 rounded-2xl p-6 w-[36rem] h-max relative"
  >
    <ul class="flex flex-row gap-4 w-full items-center justify-center">
      <button
        on:click={() => {
          clock.selectMode(options.pomodoro);
        }}
        class="text-white font-semibold text-lg border-[2px] w-44 h-10 rounded-xl hover:bg-white hover:text-black ease-in-out duration-200 {activeMode ==
        options.pomodoro
          ? 'bg-white !text-black'
          : ''}">Pomodoro</button
      >
      <button
        on:click={() => {
          clock.selectMode(options.sBreak);
        }}
        class="text-white font-semibold text-lg border-[2px] w-44 h-10 rounded-xl hover:bg-white hover:text-black ease-in-out duration-200 {activeMode ==
        options.sBreak
          ? 'bg-white !text-black'
          : ''}">Short Break</button
      >
      <button
        on:click={() => {
          clock.selectMode(options.lBreak);
        }}
        class="text-white font-semibold text-lg border-[2px] w-44 h-10 rounded-xl hover:bg-white hover:text-black ease-in-out duration-200 {activeMode ==
        options.lBreak
          ? 'bg-white !text-black'
          : ''}">Long Break</button
      >
    </ul>
    <section class="text-center flex flex-col font-bold w-full text-white">
      <div class="text-base ease-in-out flex items-center flex-col duration-700 overflow-hidden mt-6 {options.autoBreak ? 'h-0 opacity-0':' opacity-100 h-12'}">
        <span class="font-thin">Pomodoro Goal</span>
        <div class="flex">
          <button on:click={()=>{options.pomoGoal <= 0 ? null : options.pomoGoal -= 1}} class="select-none mr-2">-</button>
          <span>{`${options.pomoCount}/${options.pomoGoal}`}</span>
          <button on:click={()=>{options.pomoGoal += 1}} class="select-none ml-2">+</button>
        </div>
      </div>
      <span class="text-[9rem] leading-none mb-8 mt-5 pointer-events-none ease-in-out duration-300">
        {time.min < 10 ? `0${time.min}` : time.min}:{time.sec < 10? `0${time.sec}`: time.sec}
      </span>
    </section>
    <div class="flex items-center justify-between">
      <button title="Auto Breaks" on:click={()=>{options.autoBreak = !options.autoBreak}} class="flex border-2 border-white p-[6px] w-48 h-16 rounded-3xl">
        <div class="h-full flex items-center justify-center rounded-2xl w-1/2 ease-in-out duration-300 bg-white {options.autoBreak ? ' translate-x-[100%]':''}">
          <svg class="{!options.autoBreak ? 'hidden' : 'block'}" width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.10864 15.7776C1.64774 16.0573 1.18084 16.0732 0.707951 15.8253C0.235984 15.5784 0 15.1967 0 14.6803V1.32001C0 0.803672 0.235984 0.42158 0.707951 0.173736C1.18084 -0.0732476 1.64774 -0.0568966 2.10864 0.222788L13.3778 6.90296C13.7926 7.16113 14 7.52687 14 8.00018C14 8.47349 13.7926 8.83924 13.3778 9.09741L2.10864 15.7776Z" fill="black"/>
          </svg>
          <svg class="{options.autoBreak ? 'hidden' : 'block'}" width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.66667 0C1.95942 0 1.28115 0.280951 0.781048 0.781048C0.280951 1.28115 0 1.95942 0 2.66667V13.3333C0 14.0406 0.280951 14.7189 0.781048 15.219C1.28115 15.719 1.95942 16 2.66667 16C3.37391 16 4.05219 15.719 4.55228 15.219C5.05238 14.7189 5.33333 14.0406 5.33333 13.3333V2.66667C5.33333 1.95942 5.05238 1.28115 4.55228 0.781048C4.05219 0.280951 3.37391 0 2.66667 0ZM12 0C11.2928 0 10.6145 0.280951 10.1144 0.781048C9.61429 1.28115 9.33333 1.95942 9.33333 2.66667V13.3333C9.33333 14.0406 9.61429 14.7189 10.1144 15.219C10.6145 15.719 11.2928 16 12 16C12.7072 16 13.3855 15.719 13.8856 15.219C14.3857 14.7189 14.6667 14.0406 14.6667 13.3333V2.66667C14.6667 1.95942 14.3857 1.28115 13.8856 0.781048C13.3855 0.280951 12.7072 0 12 0Z" fill="black"/>
          </svg>
        </div>
      </button>
      <button on:click={()=>{clock.resetTimer()}}>
        <svg class="hover:rotate-[270deg] ease-in-out duration-500" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40.9428 7.05971C38.4257 4.52311 35.3703 2.58361 32.0021 1.38443C28.6339 0.185245 25.039 -0.242987 21.4829 0.131357C10.4617 1.24109 1.39241 10.179 0.161156 21.1864C-1.49053 35.7329 9.77097 48 23.9755 48C28.5104 48 32.9523 46.7149 36.785 44.2939C40.6178 41.8729 43.684 38.4155 45.6276 34.3232C46.5886 32.3137 45.1471 30.0043 42.9248 30.0043C41.8137 30.0043 40.7626 30.6041 40.2821 31.5939C38.5386 35.3401 35.5564 38.3722 31.8373 40.1803C28.1181 41.9884 23.889 42.462 19.8613 41.5215C13.1945 40.0519 7.81898 34.6232 6.40753 27.9648C5.81422 25.3322 5.82109 22.6 6.42764 19.9704C7.03418 17.3409 8.22488 14.8811 9.91166 12.7731C11.5984 10.6651 13.7382 8.96286 16.1725 7.79219C18.6069 6.62153 21.2736 6.01244 23.9755 6.00996C28.9606 6.00996 33.4051 8.07947 36.6484 11.3487L32.1138 15.8776C30.2218 17.7672 31.5432 21.0064 34.2159 21.0064H44.9969C46.6486 21.0064 48 19.6567 48 18.0071V7.23967C48 4.5703 44.7567 3.22062 42.8648 5.11018L40.9428 7.05971V7.05971Z" fill="white"/></svg>
      </button>
      <button on:click={() => {state ? clock.pauseTimer() : clock.startTimer();}} class="h-20 w-44 border-2 border-white ease-in-out duration-300 rounded-3xl text-white text-3xl font-extrabold {!state? 'bg-white !text-black': ''}">
        {!state ? "Start" : "Pause"}
      </button>
    </div>
  </section>
</div>
