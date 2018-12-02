
const sensor = require('ds18b20-raspi');

module.exports = function (){
	const tempf = sensor.readSimpleF(1);
	return tempF;
}

