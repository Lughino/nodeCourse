// pattern factory

function ABC(params) {
  this.varA = 10;
  this.varB = 20;
  this.functionA = function(var1, var2) {
    console.log(var1 + " " + var2);
  }
}

module.exports.createABC = function(params) {
  return new ABC(params);
};

// Si chiamerà in questo modo:

var fmm = require('./02_module_patterns');

var abc = fmm.createABC();

abc.functionA(4, 5);






// pattern constructor

function ABC() {
  this.varA = 10;
  this.varB = 20;
  this.functionA = function(var1, var2) {
    console.log(var1 + " " + var2);
  }
}

module.exports = ABC;

// Si chiamerà in questo modo:

var AbcConstructor = require('./02_module_patterns');

var obj = new AbcConstructor();
obj.functionA(1, 2);