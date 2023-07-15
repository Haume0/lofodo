<script lang="ts">
import classes from 'svelte-transition-classes';
import { browser } from "$app/environment";
import data from "../data.json";
import { onMount } from 'svelte';
let bg = {
  current: data.bg[4],
  all:data.bg
};
let options = {
  music: "",
  pomodoro: 150,
  sBreak: 300,
  lBreak: 900,
  autoBreak: false,
  pomoCount: 0,
  pomoGoal:3,
};
interface Isounds {
  start: HTMLAudioElement
  pause: HTMLAudioElement
  bell: HTMLAudioElement
}
let sounds :Isounds
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
        if(activeMode == options.sBreak || activeMode == options.lBreak){
          mode = options.pomodoro
        }else if(options.pomoCount >= options.pomoGoal){
          options.pomoCount = 0
          mode = options.lBreak
          activeMode = mode
        }
        else{
          options.pomoCount++;
          mode = options.sBreak
        }
        activeMode = mode
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
    state = false
    clearInterval(interval!)
  },
  selectMode(arg: number) {
    mode = arg;
    activeMode = arg;
    this.resetTimer()
  },
};
$: time = {
  sec: mode % 60,
  min: Math.floor(mode / 60),
};
let menu = {
  background:false
}
function selectBackground(arg:string){
  bg.current = arg
  localStorage.setItem('bg',arg)
}
function saveOp(){ 
  localStorage.setItem('options',JSON.stringify(options))
}
onMount(()=>{
  if(!browser)return
  bg.current = localStorage.getItem('bg') || data.bg[0]
  options.pomoGoal = JSON.parse(localStorage.getItem('options') || JSON.stringify(options))['pomoGoal']
  options.pomoCount = JSON.parse(localStorage.getItem('options') || JSON.stringify(options))['pomoCount']
})
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
      class="absolute w-full h-full object-cover md:object-contain object-center"
    />
  </div>
  <main class="absolute left-0 w-full md:w-max md:left-8 bg-black/40 rounded-2xl p-4 top-8">
    <h1 class="text-6xl font-extrabold text-white">LOFODO</h1>
    <h2 class="text-pink-400 font-thin">A project by 
      <a href="https://github.com/Haume0" target="_blank" class="font-medium hover:underline underline-offset-4" rel="noreferrer">Haume</a>
    </h2>
    <p class="text-white font-thin">Customizable, advanced focusing application.</p>
  </main>
  <section class="absolute right-4 md:right-8 bg-black/40 rounded-2xl p-4 md:top-8 top-12">
    <button on:click={()=>{menu.background = true}} class=" w-6 flex items-center justify-center h-6">
      <svg viewBox="0 0 32 32" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25.5968 20.8001V27.2C25.5968 28.08 24.8769 28.8 23.997 28.8H4.7994C3.91951 28.8 3.1996 28.08 3.1996 27.2V8.00018C3.1996 7.12018 3.91951 6.40019 4.7994 6.40019H9.6308C10.5107 6.40019 11.2306 5.68019 11.2306 4.8002C11.2306 3.92021 10.5107 3.20021 9.6308 3.20021H3.1996C1.43982 3.20021 0 4.6402 0 6.40019V28.8C0 30.56 1.43982 32 3.1996 32H25.5968C27.3566 32 28.7964 30.56 28.7964 28.8V20.8001C28.7964 19.9201 28.0765 19.2001 27.1966 19.2001C26.3167 19.2001 25.5968 19.9201 25.5968 20.8001ZM21.5973 25.6H7.2311C6.55918 25.6 6.19123 24.8321 6.60717 24.3041L9.39083 20.7361C9.46457 20.6417 9.55858 20.565 9.6659 20.5118C9.77323 20.4586 9.89113 20.4302 10.0109 20.4287C10.1307 20.4271 10.2493 20.4525 10.3579 20.503C10.4666 20.5534 10.5625 20.6276 10.6387 20.7201L13.1344 23.7281L16.8939 18.8961C17.2139 18.4801 17.8538 18.4801 18.1577 18.9121L22.2372 24.3361C22.6372 24.8481 22.2532 25.6 21.5973 25.6ZM27.6765 11.0242C28.4444 9.79216 28.8764 8.35217 28.7804 6.76818C28.5724 3.32821 25.8368 0.41623 22.4292 0.0482329C21.4204 -0.0691419 20.3981 0.028292 19.4296 0.334133C18.4612 0.639974 17.5683 1.1473 16.8098 1.82278C16.0513 2.49826 15.4443 3.3266 15.0287 4.25339C14.613 5.18018 14.3982 6.18444 14.3982 7.20018C14.3982 11.1842 17.6138 14.4001 21.5813 14.4001C22.9891 14.4001 24.301 13.9841 25.4048 13.2801L29.2603 17.1361C29.8843 17.7601 30.9081 17.7601 31.5321 17.1361C32.156 16.5121 32.156 15.4881 31.5321 14.8641L27.6765 11.0242ZM21.5973 11.2002C20.5366 11.2002 19.5193 10.7787 18.7692 10.0286C18.0192 9.27845 17.5978 8.26104 17.5978 7.20018C17.5978 6.13932 18.0192 5.12191 18.7692 4.37177C19.5193 3.62163 20.5366 3.20021 21.5973 3.20021C22.658 3.20021 23.6753 3.62163 24.4254 4.37177C25.1754 5.12191 25.5968 6.13932 25.5968 7.20018C25.5968 8.26104 25.1754 9.27845 24.4254 10.0286C23.6753 10.7787 22.658 11.2002 21.5973 11.2002Z" fill="white"/>
      </svg>
    </button>
  </section>
  <section
    id="clock"
    class="bg-black/40 rounded-2xl p-4 md:p-6 w-full md:w-[36rem] h-max relative"
  >
    <ul class="flex flex-row gap-2 md:gap-4 w-full items-center justify-center">
      <button
        on:click={() => {
          clock.selectMode(options.pomodoro);
        }}
        class="text-white font-semibold text-sm md:text-lg border-[2px] w-44 h-10 rounded-xl hover:bg-white hover:text-black ease-in-out duration-200 {activeMode ==
        options.pomodoro
          ? 'bg-white !text-black'
          : ''}">Pomodoro</button
      >
      <button
        on:click={() => {
          clock.selectMode(options.sBreak);
        }}
        class="text-white font-semibold text-sm md:text-lg border-[2px] w-44 h-10 rounded-xl hover:bg-white hover:text-black ease-in-out duration-200 {activeMode ==
        options.sBreak
          ? 'bg-white !text-black'
          : ''}">Short Break</button
      >
      <button
        on:click={() => {
          clock.selectMode(options.lBreak);
        }}
        class="text-white font-semibold text-sm md:text-lg border-[2px] w-44 h-10 rounded-xl hover:bg-white hover:text-black ease-in-out duration-200 {activeMode ==
        options.lBreak
          ? 'bg-white !text-black'
          : ''}">Long Break</button
      >
    </ul>
    <section class="text-center flex flex-col font-bold w-full text-white">
      <div class="text-base ease-in-out flex items-center flex-col duration-700 overflow-hidden mt-6 {options.autoBreak ? 'h-0 opacity-0':' opacity-100 h-12'}">
        <span class="font-thin text-xs md:text-base">Pomodoro Goal</span>
        <div class="flex text-xs md:text-base">
          <button on:click={()=>{options.pomoGoal <= 0 ? null : options.pomoGoal -= 1 ; saveOp()}} class="select-none mr-2">-</button>
          <span>{`${options.pomoCount}/${options.pomoGoal}`}</span>
          <button on:click={()=>{options.pomoGoal += 1 ; saveOp()}} class="select-none ml-2">+</button>
        </div>
      </div>
      <span class="text-[6rem] md:text-[9rem] leading-none mb-4 md:mb-8 mt-3 md:mt-5 pointer-events-none ease-in-out duration-300">
        {time.min < 10 ? `0${time.min}` : time.min}:{time.sec < 10? `0${time.sec}`: time.sec}
      </span>
    </section>
    <div class="flex items-center justify-between">
      <button title="Auto Breaks" on:click={()=>{options.autoBreak = !options.autoBreak}} class="flex border-2 border-white p-[6px] w-32 md:w-48 h-12 md:h-16 rounded-2xl md:rounded-3xl">
        <div class="h-full flex items-center justify-center rounded-xl md:rounded-2xl w-1/2 ease-in-out duration-300 bg-white {!options.autoBreak ? ' translate-x-[100%]':''}">
          <svg class="{options.autoBreak ? 'hidden' : 'block'}" width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.10864 15.7776C1.64774 16.0573 1.18084 16.0732 0.707951 15.8253C0.235984 15.5784 0 15.1967 0 14.6803V1.32001C0 0.803672 0.235984 0.42158 0.707951 0.173736C1.18084 -0.0732476 1.64774 -0.0568966 2.10864 0.222788L13.3778 6.90296C13.7926 7.16113 14 7.52687 14 8.00018C14 8.47349 13.7926 8.83924 13.3778 9.09741L2.10864 15.7776Z" fill="black"/>
          </svg>
          <svg class="{!options.autoBreak ? 'hidden' : 'block'}" width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.66667 0C1.95942 0 1.28115 0.280951 0.781048 0.781048C0.280951 1.28115 0 1.95942 0 2.66667V13.3333C0 14.0406 0.280951 14.7189 0.781048 15.219C1.28115 15.719 1.95942 16 2.66667 16C3.37391 16 4.05219 15.719 4.55228 15.219C5.05238 14.7189 5.33333 14.0406 5.33333 13.3333V2.66667C5.33333 1.95942 5.05238 1.28115 4.55228 0.781048C4.05219 0.280951 3.37391 0 2.66667 0ZM12 0C11.2928 0 10.6145 0.280951 10.1144 0.781048C9.61429 1.28115 9.33333 1.95942 9.33333 2.66667V13.3333C9.33333 14.0406 9.61429 14.7189 10.1144 15.219C10.6145 15.719 11.2928 16 12 16C12.7072 16 13.3855 15.719 13.8856 15.219C14.3857 14.7189 14.6667 14.0406 14.6667 13.3333V2.66667C14.6667 1.95942 14.3857 1.28115 13.8856 0.781048C13.3855 0.280951 12.7072 0 12 0Z" fill="black"/>
          </svg>
        </div>
      </button>
      <button on:click={()=>{clock.resetTimer() ; clock.pauseTimer()}}>
        <svg class="hover:rotate-[270deg] ease-in-out duration-500 md:w-12 md:h-12 w-8 h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40.9428 7.05971C38.4257 4.52311 35.3703 2.58361 32.0021 1.38443C28.6339 0.185245 25.039 -0.242987 21.4829 0.131357C10.4617 1.24109 1.39241 10.179 0.161156 21.1864C-1.49053 35.7329 9.77097 48 23.9755 48C28.5104 48 32.9523 46.7149 36.785 44.2939C40.6178 41.8729 43.684 38.4155 45.6276 34.3232C46.5886 32.3137 45.1471 30.0043 42.9248 30.0043C41.8137 30.0043 40.7626 30.6041 40.2821 31.5939C38.5386 35.3401 35.5564 38.3722 31.8373 40.1803C28.1181 41.9884 23.889 42.462 19.8613 41.5215C13.1945 40.0519 7.81898 34.6232 6.40753 27.9648C5.81422 25.3322 5.82109 22.6 6.42764 19.9704C7.03418 17.3409 8.22488 14.8811 9.91166 12.7731C11.5984 10.6651 13.7382 8.96286 16.1725 7.79219C18.6069 6.62153 21.2736 6.01244 23.9755 6.00996C28.9606 6.00996 33.4051 8.07947 36.6484 11.3487L32.1138 15.8776C30.2218 17.7672 31.5432 21.0064 34.2159 21.0064H44.9969C46.6486 21.0064 48 19.6567 48 18.0071V7.23967C48 4.5703 44.7567 3.22062 42.8648 5.11018L40.9428 7.05971V7.05971Z" fill="white"/></svg>
      </button>
      <button on:click={() => {state ? clock.pauseTimer() : clock.startTimer();}} class="md:h-20 h-16 md:w-44 w-36 border-2 border-white ease-in-out duration-300 rounded-3xl text-white text-2xl md:text-3xl font-extrabold {!state? 'bg-white !text-black': ''}">
        {!state ? "Start" : "Pause"}
      </button>
    </div>
  </section>
</div>


{#if menu.background}
<section   in:classes="{{
  base: 'transition ease-out duration-300',
  from: 'transform opacity-0',
  to: 'transform opacity-100',
}}"
out:classes="{{
  base: 'transition ease-in duration-300',
  from: 'transform opacity-100',
  to: 'transform opacity-0',
}}" class="bg-black/40 fixed justify-center flex left-0 top-0 w-full h-full">
  <section class="relative pt-24 mt-12 grid grid-cols-3 grid-flow-row w-[64rem] h-[90%] gap-4 overflow-hidden overflow-y-scroll bg-black rounded-3xl p-12">
    <div class="absolute left-0 px-12 w-full flex items-center justify-between top-8">
      <h1 class="text-white text-2xl font-bold">Backgrounds</h1>
      <button class=" text-white" on:click={()=>{menu.background = false}}>\Close</button>
    </div>
    {#each bg.all as item}
    <button on:click={()=>{selectBackground(item);menu.background = false}} class="flex flex-col">
      <img src={item} loading="lazy" class="w-72 border-2 border-white/0 ease-in-out duration-200 hover:border-white h-44 object-cover object-center rounded-lg" alt="">
    </button>
    {/each}
  </section>
</section>
{/if}