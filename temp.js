
const sensor = require('ds12b20-raspi');

module.exports = function (){
	const tempf = sensor.readSimpleF(1);
	return tempF;
}

