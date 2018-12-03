//establish socket connection
console.log('im in here');
var socket = io.connect('http://localhost:3000');



//listen for events
socket.on('temp', function(data){
	document.getElementById('curr-temp').innerHTML =  data ;
	console.log(data);
});