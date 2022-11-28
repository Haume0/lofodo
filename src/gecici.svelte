<main class="absolute w-screen noslc flex h-screen !bg-cover !bg-center overflow-hidden bg-black">
    <img src="{setting.background}" alt="" class="absolute w-screen h-screen object-cover blur-[100px]"/>
    <img src="{setting.background}" alt="" class="absolute w-screen h-screen object-contain"/>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class:!pr-2={showbg == true} class="group hover:cursor-pointer ease-in-out duration-500 absolute left-10 top-10 w-auto h-8 bg-black/40 rounded-full flex flex-row">
      <svg on:click={()=> showbg = !showbg} class="hover:fill-sky-500 fill-white mx-1 my-auto" width="24" height="24" viewBox="0 0 24 24"><path d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h5v2H5v14h14v-5.35l2 2V19q0 .825-.587 1.413Q19.825 21 19 21Zm15.85-8.3l-2.4-2.4q-.525.35-1.125.525q-.6.175-1.275.175q-1.85 0-3.15-1.312q-1.3-1.313-1.3-3.188q0-1.875 1.313-3.188Q14.225 2 16.1 2q1.875 0 3.188 1.312Q20.6 4.625 20.6 6.5q0 .675-.2 1.3t-.5 1.15l2.35 2.35q.275.275.275.7q0 .425-.275.7q-.275.275-.7.275q-.425 0-.7-.275ZM16.1 9q1.05 0 1.775-.725q.725-.725.725-1.775q0-1.05-.725-1.775Q17.15 4 16.1 4q-1.05 0-1.775.725Q13.6 5.45 13.6 6.5q0 1.05.725 1.775Q15.05 9 16.1 9ZM7 17q-.3 0-.45-.275q-.15-.275.05-.525l2-2.675q.15-.2.4-.2t.4.2L11.25 16l2.6-3.475q.15-.2.4-.2t.4.2L17.4 16.2q.2.25.05.525Q17.3 17 17 17Z"/></svg>
      <input bind:value={tempBG} on:keypress={bcr} class:!w-0={showbg == false} type="text" placeholder="Enter a background link. *.png, .gif etc." name="bg" id="" class="bg-transparent w-56 !border-b-[2px] h-[85%] !border-white ease-in-out duration-500 appearance-none outline-none">
      <svg on:click={()=> luckyBG()} class:!hidden={showbg == false} class="hover:fill-violet-500 fill-white ml-2 my-auto" width="18" height="24" viewBox="0 0 448 472"><path d="M399 15Q386 2 369.5 2T340 15L37 316q-13 13-13 30t13 30l30 32q13 13 29.5 13t29.5-13l303-303q13-13 13-30t-13-30zm-91 152l-30-30l89-92l30 30zM67 3Q45 3 45 24v21H24Q3 45 3 67q0 21 21 21h21v21q0 22 22 22q9 0 15-6t6-16V88h21q10 0 16-6t6-15q0-22-22-22H88V24Q88 3 67 3zm298 256q-21 0-21 21v21h-21q-22 0-22 22q0 9 6 15t16 6h21v21q0 10 6 16t15 6q22 0 22-22v-21h21q21 0 21-21q0-22-21-22h-21v-21q0-21-22-21z"/></svg>
    </div>
    <div class:!translate-y-0={show == true} class:yt_full={fullsc == true} class="absolute noslc ease-in-out duration-500 bottom-10 translate-y-[calc(100%+40px)] min-w-[440px] min-h-[80px] left-8 flex flex-col gap-1">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div on:click={()=> show = !show} class="absolute flex place-items-center hover:cursor-pointer justify-items-center z-10 -top-4 self-center bg-black/40 w-12 h-4 rounded-t-xl">
        <svg class:rotate-180={show == true} class="mx-auto fill-white" width="24" height="24" viewBox="0 0 24 24"><path d="m7 14l5-5l5 5Z"/></svg></div>
      {#if setting.yt != ''}<iframe class:yt_full={fullsc == true} class="relative w-[440px] h-[248px] rounded-xl" src="{'https://www.youtube.com/embed/'+getId(setting.yt)+'?autoplay=1&controls=1&fs=0'}" title="YT" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>{/if}
      {#if setting.sp != ''}<iframe class="relative" style="border-radius:12px" width="440" height="80" title="" src="{setting.sp.replace('/track','/embed/track').replace('/playlist','/embed/playlist').replace('/episode','/embed/episode').replace('/album','/embed/album')}"  frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>{/if}  
      <div class="absolute right-1 top-1 flex flex-row gap-1">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        {#if true}<div on:click={()=> lucky()} class="relative cursor-pointer z-50 w-6 h-6 justify-center place-items-center flex bg-black/60 rounded-full group">
          <svg class="group-hover:fill-violet-500 fill-white" width="15" height="18" viewBox="0 0 448 472"><path d="M399 15Q386 2 369.5 2T340 15L37 316q-13 13-13 30t13 30l30 32q13 13 29.5 13t29.5-13l303-303q13-13 13-30t-13-30zm-91 152l-30-30l89-92l30 30zM67 3Q45 3 45 24v21H24Q3 45 3 67q0 21 21 21h21v21q0 22 22 22q9 0 15-6t6-16V88h21q10 0 16-6t6-15q0-22-22-22H88V24Q88 3 67 3zm298 256q-21 0-21 21v21h-21q-22 0-22 22q0 9 6 15t16 6h21v21q0 10 6 16t15 6q22 0 22-22v-21h21q21 0 21-21q0-22-21-22h-21v-21q0-21-22-21z"/></svg>
        </div>{/if}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        {#if rawSource != '' && setting.yt != ''}<div on:click={()=> fullsc = !fullsc} class="relative cursor-pointer z-50 w-6 h-6 justify-center place-items-center flex bg-black/60 rounded-full group">
          <svg class:hidden={fullsc == false} class="group-hover:fill-cyan-400 fill-white" width="32" height="32" viewBox="0 0 24 24"><path d="M8 19v-3H5v-2h5v5Zm6 0v-5h5v2h-3v3Zm-9-9V8h3V5h2v5Zm9 0V5h2v3h3v2Z"/></svg>
          <svg class:hidden={fullsc == true} class="group-hover:fill-cyan-400 fill-white" width="32" height="32" viewBox="0 0 24 24"><path d="M5 19v-5h2v3h3v2Zm0-9V5h5v2H7v3Zm9 9v-2h3v-3h2v5Zm3-9V7h-3V5h5v5Z"/></svg></div>{/if}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        {#if true}<div on:click={()=> scrBack()} class="relative cursor-pointer z-50 w-6 h-6 justify-center place-items-center flex bg-black/60 rounded-full group">
          <svg class="group-hover:fill-violet-500 fill-white" width="20" height="20" viewBox="0 0 24 24"><path d="M5 3c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2v7H5V5h7V3H5m12.78 1a.69.69 0 0 0-.48.2l-1.22 1.21l2.5 2.5L19.8 6.7c.26-.26.26-.7 0-.95L18.25 4.2c-.13-.13-.3-.2-.47-.2m-2.41 2.12L8 13.5V16h2.5l7.37-7.38l-2.5-2.5Z"/></svg></div>{/if}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        {#if rawSource != '' && setting.sp != '' || setting.yt != ''}<div on:click={()=> scrReset()} class="relative cursor-pointer z-50 w-6 h-6 justify-center place-items-center flex bg-black/60 rounded-full group"><svg class="group-hover:stroke-red-500 stroke-white" width="32" height="32" viewBox="0 0 16 16"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m11.25 4.75l-6.5 6.5m0-6.5l6.5 6.5"/></svg></div>{/if}
      </div>
      <div class="absolute left-0 top-0">
        <!-- <button on:click={() => scrBack()} class="w-5 h-[80px] -left-5 z-20 hover:cursor-pointer flex rounded-full bg-white/40 absolute group"><svg class:rotate-180={rawSource == ''} class="my-auto rotate-180" width="36" height="36" viewBox="0 0 24 24"><path d="M10 17V7l5 5Z"/></svg></button> -->
        {#if showscr}<div in:fly out:fly class:!w-screen={fullsc == true} class="w-[440px] h-[80px] z-10 absolute p-2 flex flex-col bg-black/40 backdrop-blur-sm rounded-xl">
          <span class="mx-auto font-Figtree font-semibold text-white">Music Source</span>
          <div>
            <input on:keypress={scr} type="text" class="absolute max-w-[96%] m-auto text-white  h-8 bg-transparent pl-1 w-full outline-none border-b-[2px] focus:border-b-[2px] placeholder:text-zinc-200 border-white focus:border-[#4CC2CA] ease-in-out duration-500 appearance-none focus:outline-none" bind:value={aSource} placeholder="Music Source *Spotify or Youtube link..." />
          </div>
        </div>{/if}
      </div>
    </div>
    <div class="absolute flex flex-col bg-black/20 p-2 w-auto rounded-xl h-auto right-6 bottom-6 z-50">
      <img src="/spicaLofitexed.svg" alt="" class="">
      <span class="text-zinc-300 w-[100%] text-right font-Figtree">A project by <a href="https://github.com/Haume0" target="_blank" rel="noreferrer" class="text-white hover:text-purple-400 w-auto text-right font-medium font-Figtree high">Haume</a>.</span>
      <div class="flex flex-row gap-2 self-end">
        <a href="https://www.patreon.com/Haume" target="_blank" rel="noreferrer" class="text-white font-medium font-Figtree hover:text-orange-600 w-auto text-right high">Buy me a coffee.</a>
        <a href="https://spica.systems" class="text-white hover:text-cyan-400 w-auto text-right font-medium font-Figtree high">Return Spica</a>
      </div>
    </div>
    <div class="relative flex flex-col m-auto z-10 sm:scale-95 md:scale-100 bg-black/10 p-2 rounded-xl">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div class="h-[20px] hover:cursor-pointer mb-2 flex flex-row noslc gap-[2px] place-items-center place-content-center self-center">
        {#if setting.auto == true}
        <svg on:click={()=> chg(-1)} width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 12.998H5v-2h14z"/></svg>
        <span on:click={()=> setting.pomoCount = 0} class="text-white text-sm ease-in-out duration-200 font-Figtree font-semibold text-center">#{setting.pomoCount}/{setting.longCount}</span>
        <svg on:click={()=> chg(1)} width="24" height="24" viewBox="0 0 16 16"><path fill="currentColor" d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg>
        {/if}</div>
      <div class="flex flex-row gap-4">
        <button on:click={()=>Mode(setting.pomodoro,'pomodoro')} class:btn_active={modebtn == 'pomodoro'} class="relative w-32 h-10 border-white font-Figtree hover:bg-white checked:bg-black hover:text-black font-bold ease-in-out duration-200 border-[2px] rounded-xl">Pomodoro</button>
        <button on:click={()=>Mode(setting.short,'short')} class:btn_active={modebtn == 'short'} class="relative w-32 h-10 border-white font-Figtree hover:bg-white hover:text-black font-bold ease-in-out duration-200 border-[2px] rounded-xl">Short Break</button>
        <button on:click={()=>Mode(setting.long,'long')} class:btn_active={modebtn == 'long'} class="relative w-32 h-10 border-white font-Figtree hover:bg-white hover:text-black font-bold ease-in-out duration-200 border-[2px] rounded-xl">Long Break</button>
      </div>
      <h1 class="text-white ease-in-out duration-200 font-Figtree font-semibold text-[128px] text-center w-96">{timer.min}:{timer.sec}</h1>
      <div class="flex flex-row gap-8 justify-end place-items-center">
        <button on:click={()=>autoSwitch()} class=" w-28 h-12 bg-white c-c  rounded-full"><div class="w-11 h-11 flex ease-in-out duration-500 rounded-full"class:slid_OFF={setting.auto == false} class:slid_ON={setting.auto == true}>
          {#if setting.auto == true}<img src="/on.svg" class="m-auto" alt="">{/if}
          {#if setting.auto == false}<img src="/off.svg" class="m-auto" alt="">{/if}
        </div></button>
        <button on:click={()=>reset()} class="group"><svg class="fill-white group-hover:cursor-pointer group-hover:rotate-[360deg] ease-in-out duration-700" width="48" height="48" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M40.9428 7.05971C38.4257 4.52311 35.3703 2.58361 32.0021 1.38443C28.6339 0.185245 25.039 -0.242987 21.4829 0.131357C10.4617 1.24109 1.39241 10.179 0.161156 21.1864C-1.49053 35.7329 9.77097 48 23.9755 48C28.5104 48 32.9523 46.7149 36.785 44.2939C40.6178 41.8729 43.684 38.4155 45.6276 34.3232C46.5886 32.3137 45.1471 30.0043 42.9248 30.0043C41.8137 30.0043 40.7626 30.6041 40.2821 31.5939C38.5386 35.3401 35.5564 38.3722 31.8373 40.1803C28.1181 41.9884 23.889 42.462 19.8613 41.5215C13.1945 40.0519 7.81898 34.6232 6.40753 27.9648C5.81422 25.3322 5.82109 22.6 6.42764 19.9704C7.03418 17.3409 8.22488 14.8811 9.91166 12.7731C11.5984 10.6651 13.7382 8.96286 16.1725 7.79219C18.6069 6.62153 21.2736 6.01244 23.9755 6.00996C28.9606 6.00996 33.4051 8.07947 36.6484 11.3487L32.1138 15.8776C30.2218 17.7672 31.5432 21.0064 34.2159 21.0064H44.9969C46.6486 21.0064 48 19.6567 48 18.0071V7.23967C48 4.5703 44.7567 3.22062 42.8648 5.11018L40.9428 7.05971V7.05971Z"/></svg></button>
        <button on:click={()=>startBtn()} class:btn_deactive={timer.state == 'Pause'} class="bg-white text-black w-40 h-16 rounded-3xl text-3xl font-Figtree font-extrabold border-[2px] border-transparent hover:ext-white hover:g-black/10 ease-in-out duration-300 hover:order-white">{timer.state}</button>
      </div>
    </div>
  </main>