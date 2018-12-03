var socket = io.connect('http://localhost:3000');



function updateJSON(){
	console.log("updating json in client");
	let year = parseInt(document.getElementById('year-text').innerHTML)
	let month = parseInt(document.getElementById('month-text').innerHTML)
	let day = parseInt(document.getElementById('day-text').innerHTML)
	let hour = parseInt(document.getElementById('hour-text').innerHTML)
	let minute = parseInt(document.getElementById('minute-text').innerHTML)

	let today = new Date();
	let userDate = new Date(year, month, day, hour, minute);
	let offset = Math.abs(today-userDate);

    offset = 4

		socket.emit('time', {
			offsettime: offset
		});
	console.log("it's done in client");
}