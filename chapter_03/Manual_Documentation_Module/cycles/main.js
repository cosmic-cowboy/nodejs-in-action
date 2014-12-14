// Cycles
// http://nodejs.org/api/modules.html#modules_cycles
// When main.js loads a.js, then a.js in turn loads b.js. 
// At that point, b.js tries to load a.js. 
// In order to prevent an infinite loop an unfinished copy of the a.js exports object is returned to the b.js module. 
// b.js then finishes loading, and its exports object is provided to the a.js module.


console.log('main starting');

var a = require('./a');
var b = require('./b');

console.log('in main a.done=%j, b.done=%j', a.done, b.done);

