// con la require non occorre inserire l'estensione
var incusioneMetodi = require('./01_esporre_metodi');

// stamperà "Hello World"
incusioneMetodi.helloWorld();

var Saluto = incusioneMetodi.greeter('en');
Saluto.greet();

incusioneMetodi.goodbye();