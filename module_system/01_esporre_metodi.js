function Greeter(lang) {
  this.language = lang;
  this.greet = function() {
    switch (this.language) {
      case "en":
        return "Hello!";
      case "de":
        return "Hallo!";
      case "jp":
        return "こんにちは!";
      default:
        return "No speaka that language";
    }
  }
}

module.exports.helloWorld = function() {
  console.log("Hello World");
};

module.exports.goodbye = function() {
  console.log("Bye bye!");
};

module.exports.greeter = function(lang) {
  return new Greeter(lang);
};


