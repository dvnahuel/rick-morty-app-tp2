
if ('serviceWorker' in navigator){
    navigator.serviceWorker.register("../sw.js").then((message)=>{
        console.log('Se registro el Service Worker');
    });
} else {
    console.log('Este Service Worker no es soportado');
}