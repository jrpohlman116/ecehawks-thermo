const sensor = require('ds18b20-raspi');


module.exports = function (){
	const tempF = sensor.readSimpleF();
	return tempF;
} 
