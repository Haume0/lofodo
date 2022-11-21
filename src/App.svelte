<script>
	import { fade, fly, slide, scale, blur } from "svelte/transition";
const luck = [
  'https://open.spotify.com/playlist/37i9dQZF1DX4nNmLlb3JR2?si=8c087adbbf5345ea',
  'https://open.spotify.com/playlist/37i9dQZF1DX3SNr5BeQZSd?si=cd5016d443634ff4',
  'https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn?si=b8c83e914dda4023',
  'https://open.spotify.com/playlist/37i9dQZF1DWYoYGBbGKurt?si=06c48e643b3a4677',
  'https://open.spotify.com/playlist/37i9dQZF1DX9RwfGbeGQwP?si=4f9b2a6bcfc443d9',
  'https://open.spotify.com/playlist/471N195f5jAVs086lzYglw?si=9c1315d57b424803',
  'https://open.spotify.com/playlist/37i9dQZF1DWWb1L5n1gkOJ?si=9d902a344f61468d',
  'https://open.spotify.com/playlist/37i9dQZF1DWYFCj3KyU0r0?si=c3401ab9306d4a51',
  'https://open.spotify.com/playlist/37i9dQZF1DWZ27zYbfKITD?si=b3d960a0bd624d79z',
  'https://open.spotify.com/playlist/37i9dQZF1DWZeKCadgRdKQ?si=db19796378c647a1',
  'https://www.youtube.com/watch?v=-R0UYHS8A_A',
  'https://www.youtube.com/watch?v=tNkZsRW7h2c',
  'https://www.youtube.com/watch?v=7NOSDKb0HlU',
  'https://www.youtube.com/watch?v=ORBwkXsUNEs',
  'https://www.youtube.com/watch?v=jfKfPfyJRdk',
  'https://www.youtube.com/watch?v=HDhR2Yhnvfo',
  'https://www.youtube.com/watch?v=-5KAN9_CzSA',
  'https://www.youtube.com/watch?v=-9gEgshJUuY',
  'https://www.youtube.com/watch?v=rUxyKA_-grg',
  'https://www.youtube.com/watch?v=DKBcDzAvbXU',
  'https://www.youtube.com/watch?v=Ml-HGbkZeAs',
  'https://www.youtube.com/watch?v=BrnDlRmW5hs',
  'https://www.youtube.com/watch?v=gnZImHvA0ME',
  'https://www.youtube.com/watch?v=Nyx6SBixRE8',
  'https://www.youtube.com/watch?v=EIm4HvDgQCM',
  'https://www.youtube.com/watch?v=O50aTCmp-PI',
  'https://www.youtube.com/watch?v=kCOZECDM3f0',
  'https://www.youtube.com/watch?v=2GeARueYx1s',
  'https://www.youtube.com/watch?v=UeMl03hXH-s',
  'https://www.youtube.com/watch?v=d8kwCDDIZqE',
]
const luckBG = [
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F3e%2F4c%2F9d%2F3e4c9d81ba6be013081a1506dd7fcdec.gif&f=1&nofb=1&ipt=7f6162eee81594c85d933650d6411ae5c6e4f5dded816f2c49488373ef0c9343&ipo=images',
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Forig00.deviantart.net%2F9923%2Ff%2F2015%2F321%2F9%2Fd%2Fblue_balcony_by_kirokaze-d9h03vb.gif&f=1&nofb=1&ipt=2c31fb0f75fb4e0e78a82eb050ad3d0be49600a56ab3c06332bed0cd3c4b2b1e&ipo=images',
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fd8%2Fa5%2Fe2%2Fd8a5e2c40a794efc2a0422c795b45b07.gif&f=1&nofb=1&ipt=2d79bfddb8cbef2b37d8384e3c7a78f7cea039853536a0a2e1b689b5036a7fbe&ipo=images',
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcoolhdwall.com%2Fstorage%2F202103%2Flofi-chill-anime-girl-2k-wallpaper-2560x1440.jpg&f=1&nofb=1&ipt=fc4755216c5fd44a2a18b49174b73f0fb91825d0f27fea47dd506ed7feb246fe&ipo=images',
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F7a%2Fc7%2F1e%2F7ac71e72373b0fb270b3a6d72e44eea3.gif&f=1&nofb=1&ipt=21121098748d63d023cb5bd5991a5cc80143603cb8dd3c4a211c32475d3c0633&ipo=images',
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperforu.com%2Fwp-content%2Fuploads%2F2020%2F08%2Flofi-wallpaper-20080914345812.jpg&f=1&nofb=1&ipt=23671a4133ffd8198f6903203b90d67de1429b35001432835a8e91f0257c3694&ipo=images',
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F2641092.gif&f=1&nofb=1&ipt=85ee34e3d2578c27d9ffb210b01bb832f3c5865c829ee093bd9a44d850cf6144&ipo=images',
  'https://cdnb.artstation.com/p/assets/images/images/043/163/227/original/augustin-cart-gif-lofi-final.gif?1636484521',
  'https://mir-s3-cdn-cf.behance.net/project_modules/fs/7c437491643371.5e3789ca6ce29.gif',
  'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia3.giphy.com%2Fmedia%2Fkbtysky2x8fZLW8osP%2Fgiphy.gif&f=1&nofb=1&ipt=ca9beee4c198d88fb89d764bd9504059cfa762271ba91aa3c7d60039ff7e71b3&ipo=images',
  'https://64.media.tumblr.com/4734a95434dae031db7592d38f53325e/c852cd6b0b36d1f8-a9/s1280x1920/30d1ef996b6e0f93f9480f0c11a91f62c9a282c4.gifv',
  'https://64.media.tumblr.com/5f70d86324e1c66a0f6e37c51ef17ded/c58053912d66cc80-f2/s500x750/089d028df00ee4a5b433191376d23e2c202494c5.gifv',
  'https://i.pinimg.com/originals/bf/1b/c6/bf1bc6089078b82bdcebf00040e4a066.gif',
  'https://64.media.tumblr.com/fe6d6866c5f3902586116f472a2ab20f/921683666be3fa68-8a/s540x810/90260b81c89a1cc7d3f0bdabf9096d7530e3f83d.gifv',
  'https://i.pinimg.com/originals/ab/6a/96/ab6a961e6095214e9ad72707e5a6da85.gif',
  'https://i.pinimg.com/originals/12/15/cf/1215cfe54d09014ca375975c540dbf79.gif',
  'https://i.pinimg.com/originals/be/8c/c4/be8cc467394aab7e201d5b72b59ec35a.gif',
  'https://media.tenor.com/VaJ-j1-oU3sAAAAC/zero-two-star-gazing.gif',
  'https://i.pinimg.com/originals/f5/e9/6e/f5e96e0bf8e810185062b4078562ced6.gif',
  'https://i.pinimg.com/originals/45/ef/03/45ef038681d2e2c1485159ab522eb982.gif',
  'https://i.pinimg.com/originals/19/e8/e1/19e8e10d98b44c80531ad96b553d9ae1.gif',
  'https://i.pinimg.com/originals/94/57/8b/94578bedc7ac5fe54dc7da6539f7a240.gif',
  'https://i.pinimg.com/originals/cf/b5/db/cfb5db1eb15a0efc825181d3fa918521.gif',
  'https://cdn.discordapp.com/attachments/1031627883220848733/1044232583493456014/3dhmyq6EKw2x7eFt4X.gif',
  'https://i.pinimg.com/originals/68/44/e0/6844e091b47b6dddf0da833b736fb440.gif',
  'https://i.pinimg.com/originals/a8/44/45/a844457b997f237ecddcc0f5d592832e.gif',
  'https://i.pinimg.com/originals/c3/fe/5a/c3fe5a8ebab4d08f4aa2189397e73812.gif',
]
let showscr = false
  let setting = {
    background:'https://wallpapercave.com/wp/wp7915378.jpg',
    yt: '',
    sp: '',
    pomodoro: 1500,
    short: 300,
    long: 900,
    auto: true,
    pomoCount: 0,
    longCount: 3,
  }
  let interval = null
  let mode = setting.pomodoro
  let modebtn = 'pomodoro'
  let timer = {
    min: Math.floor(mode / 60),
    sec: (mode % 60),
    state: 'Start',
    current: setting.pomodoro
  }
function doSettings(){
  if(localStorage.getItem('autoSwitch') == null){
    localStorage.setItem('autoSwitch',setting.auto.toString())
  }
  if(localStorage.getItem('pomoCount') == null){
    localStorage.setItem('pomoCount',setting.auto.toString())
  }
  if(localStorage.getItem('longCount') == null){
    localStorage.setItem('longCount',setting.longCount.toString())
  }
  if(localStorage.getItem('yt') == null){
    localStorage.setItem('yt',setting.yt.toString())
  }
  if(localStorage.getItem('sp') == null){
    localStorage.setItem('sp',setting.sp.toString())
  }
  if(localStorage.getItem('bg') == null){
    localStorage.setItem('bg',setting.background)
  }
  if(setting.yt == "" || setting.sp == ''){
    showscr = true
  }
  getSettings()
}
doSettings()
function getSettings(){
  setting.auto =  (localStorage.getItem('autoswitch') === 'true');
  setting.pomoCount = parseInt(localStorage.getItem('pomoCount'))
  if(parseInt(localStorage.getItem('longCount')) <= 0){
    setting.longCount = setting.longCount
  }else{
    setting.longCount = parseInt(localStorage.getItem('longCount'))
  }
  setting.yt = localStorage.getItem('yt')
  setting.sp = localStorage.getItem('sp')
  setting.background = localStorage.getItem('bg')
}
 const getId = (url) => {
   const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
   const match = url.match(regExp);

   return (match && match[2].length === 11)
     ? match[2]
     : null;
 }
  function Mode(arg1,arg2){
    reset()
    mode = arg1
    timer.current = arg1
    timer.min = Math.floor(mode / 60)
    timer.sec = (mode % 60)
      // @ts-ignore
    if(timer.min < 10) timer.min = '0' + timer.min;
    // @ts-ignore
    if(timer.sec < 10) timer.sec = '0' + timer.sec
    modebtn = arg2
  }
  // @ts-ignore
  if(timer.min < 10) timer.min = '0' + timer.min;
  // @ts-ignore
  if(timer.sec < 10) timer.sec = '0' + timer.sec;

  function start(){
    if(setting.pomoCount >= setting.longCount){
        Mode(setting.long,'long')
        setting.pomoCount = 0
        start()
      }
    timer.state = 'Pause'
    if (interval){
      return
    }

    interval = setInterval(clock, 1000)

  }
  function pause(){
    timer.state = 'Start'
    clearInterval(interval);
    interval = null
  }
  function reset(){
    timer.state = 'Start'
    clearInterval(interval);
    interval = null
    mode = timer.current
    timer.min = Math.floor(mode / 60)
    timer.sec = (mode % 60)
    // @ts-ignore
    if(timer.min < 10) timer.min = '0' + timer.min;
    // @ts-ignore
    if(timer.sec < 10) timer.sec = '0' + timer.sec
  }
  function clock(){
    mode--
    timer.min = Math.floor(mode / 60)
    timer.sec = (mode % 60)
      // @ts-ignore
    if(timer.min < 10) timer.min = '0' + timer.min;
    // @ts-ignore
    if(timer.sec < 10) timer.sec = '0' + timer.sec;
    if(mode <= 0 && setting.auto == false){
      reset()
    }
    if(mode <= 0 && setting.auto == true){
      if(modebtn == 'pomodoro'){
        setting.pomoCount += 1
        localStorage.setItem('pomoCount', setting.pomoCount.toString());
        if(setting.pomoCount >= setting.longCount){
        Mode(setting.long,'long')
        start()
      }else{
        Mode(setting.short,'short')
        start()
      }
      }else if(modebtn == 'short'){
        Mode(setting.pomodoro,'pomodoro')
        start()
      }else if(modebtn == 'long'){
        Mode(setting.pomodoro,'pomodoro')
        start()
        setting.pomoCount = 0
      }
    }
  }
  function startBtn(){
    if(timer.state == 'Start'){
      start()
    }else if(timer.state == 'Pause'){
      pause()
    }
  }
  let aSource = ''
  let rawSource = ''
  function autoSwitch(){
    setting.auto = !setting.auto
    setting.pomoCount = 0
    if(setting.longCount <= 0){
      setting.longCount = 4
    }
    localStorage.setItem('autoswitch', setting.auto.toString());
  }
  const scr= (e) =>{
    if (e.charCode === 13){
      rawSource = aSource
      if(rawSource.includes('youtube')){
        setting.yt = rawSource
        setting.sp = ''
        localStorage.setItem('yt', setting.yt);
        localStorage.setItem('sp', '');
        showscr = false
        }else if(rawSource.includes('spotify')){
          setting.sp = rawSource
          setting.yt = ''
          localStorage.setItem('sp', setting.sp);
          localStorage.setItem('yt','')
          showscr = false
        }else{
          alert('Enter a valid value!')
          rawSource = ''
        }
    }
  }
  function scrBack(){
    if(rawSource != ''){
      showscr = !showscr
    }else{
      showscr = true
    }
  }
  function scrReset(){
    rawSource = ''
    aSource = ''
    localStorage.removeItem('sp');
    localStorage.removeItem('yt');
    setting.yt = ''
    setting.sp = ''
    show = false
    fullsc = false
    showscr = true
  }
  function chg(arg1){
    setting.longCount = (setting.longCount + arg1)
    if(setting.longCount <= setting.pomoCount){
      setting.pomoCount = setting.longCount
    }
    if(setting.longCount <= 0){
      setting.auto = false
    }
    localStorage.setItem('longCount', setting.longCount.toString());
    localStorage.setItem('pomoCount', setting.pomoCount.toString());
  }
  if(setting.yt != '' || setting.sp != ''){
    rawSource = '#'
  }
  function lucky(){
    rawSource = luck[Math.floor(Math.random()*luck.length)];
      if(rawSource.includes('youtube')){
        setting.yt = rawSource
        setting.sp = ''
        localStorage.setItem('yt', setting.yt);
        localStorage.setItem('sp', '');
        showscr = false
        }else if(rawSource.includes('spotify')){
          setting.sp = rawSource
          setting.yt = ''
          localStorage.setItem('sp', setting.sp);
          localStorage.setItem('yt','')
          showscr = false
          fullsc = false
        }else{
          alert('Enter a valid value!')
          rawSource = ''
        }
  }
  let show = true
  let show2 = true
  let fullsc = false
  let showbg = false
  let tempBG = ''
  const bcr= (e) =>{
    if (e.charCode === 13 && tempBG != ''){
      setting.background = tempBG
      localStorage.setItem('bg',setting.background)
      showbg = false
      tempBG = ''
    }
  }
  function luckyBG(){
    setting.background = luckBG[Math.floor(Math.random()*luckBG.length)];
    localStorage.setItem('bg',setting.background)
    if(setting.background == ''){
      setting.background = luckBG[Math.floor(Math.random()*luckBG.length)];
    }
  }
  //<svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M5 19v-5h2v3h3v2Zm0-9V5h5v2H7v3Zm9 9v-2h3v-3h2v5Zm3-9V7h-3V5h5v5Z"/></svg>
</script>
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
      {#if showscr}<div on:mouseleave={()=> scrBack()} in:fly out:fly class:!w-screen={fullsc == true} class="w-[440px] h-[80px] z-10 absolute p-2 flex flex-col bg-black/40 backdrop-blur-sm rounded-xl">
        <span class="mx-auto font-Figtree font-semibold text-white">Music Source</span>
        <div>
          <input on:keypress={scr} type="text" class="absolute max-w-[96%] m-auto text-white  h-8 bg-transparent pl-1 w-full outline-none border-b-[2px] focus:border-b-[2px] placeholder:text-zinc-200 border-white focus:border-[#4CC2CA] ease-in-out duration-500 appearance-none focus:outline-none" bind:value={aSource} placeholder="Music Source *Spotify or Youtube link..." />
        </div>
      </div>{/if}
    </div>
  </div>
  <div class="absolute flex flex-col w-56 h-20 right-6 bottom-6 z-50">
    <img src="/spicaLofitexed.svg" alt="" class="">
    <span class="text-zinc-400 w-[100%] text-right">A project by Haume.</span>
    <a href="https://www.patreon.com/Haume" target="_blank" rel="noreferrer" class="text-cyan-400 hover:text-violet-400 w-auto text-right high">Buy me a coffee.</a>
  </div>
  <div class="relative flex flex-col m-auto z-10 bg-black/10 p-2 rounded-xl">
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
<style>
  .btn_active{
    @apply bg-white text-black;
  }
  .btn_deactive{
    @apply bg-black/10 text-white border-white border-[2px];
  }
  .slid_ON{
    @apply bg-[#4CCA61] translate-x-[calc(110px-44px)];
  }
  .slid_OFF{
    @apply bg-[#CA4C4C] translate-x-[2px];
  }
  .yt_full{
    @apply absolute left-0 rounded-none bottom-0 z-10 w-screen h-screen ease-in-out duration-[0ms];
  }
</style>
