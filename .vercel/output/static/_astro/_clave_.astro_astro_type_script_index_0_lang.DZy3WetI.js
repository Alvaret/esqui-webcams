"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js",{scope:"/"}).catch(e=>{console.error("No se pudo registrar el service worker:",e)})});
