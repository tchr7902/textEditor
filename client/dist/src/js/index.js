import Editor from"./editor.js";import"./database.js";import"./install.js";import{Workbox}from"workbox-window";const main=document.querySelector("#main");main.innerHTML="";const loadSpinner=()=>{const r=document.createElement("div");r.classList.add("spinner"),r.innerHTML='\n  <div class="loading-container">\n    <div class="loading-spinner"></div>\n  </div>',main.appendChild(r)},editor=new Editor;function initWorkbox(){new Workbox("/service-worker.js").register()}editor||loadSpinner(),"serviceWorker"in navigator?window.addEventListener("load",(()=>{navigator.serviceWorker.register("/service-worker.js").then((()=>{console.log("Service worker registered successfully"),initWorkbox()})).catch((r=>{console.error("Service worker registration failed:",r)}))})):console.error("Service workers are not supported in this browser.");