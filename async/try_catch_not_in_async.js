// attenzione a non utilizzare mai il try/catch nel contesto asincrono
// avendo messo in coda l'esecuzione della funzione asincrona "setTimeout"
// questa funzione sarà eseguita fuori dal contesto try/catch e verrà generato
// un errore che non sarà gestito!

try {
  setTimeout(function() {
    throw new Error("Uh oh, something bad!");
  }, 2000);
} catch (e) {
  console.log("I caught the error: " + e.message);
}