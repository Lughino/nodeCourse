// Essendo mono-thread, occorre fare molta attenzione quando si eseguono operazioni
// che occupano molto potere computazionale, in quanto "freezano" il resto dei processi
// per fare ciò bisogna utilizzare process.nextTick() oppure setImmediate()


function compute_expensive(arr1, arr2) {
  var results = [];
  for (var i = 0 ; i < arr1.length; i++) {
    for (var j = 0; j < arr2.length; j++) {
      if (arr2[j] == arr1[i]) {
        results[results.length] = arr1[j];
        break;
      }
    }
  }
}