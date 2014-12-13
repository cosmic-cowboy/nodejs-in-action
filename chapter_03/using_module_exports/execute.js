var Currency = require('./currency');
var canadianDollar = 0.91;

var currency = new Currency(canadianDollar);

console.log(currency.canadianToUS(50));