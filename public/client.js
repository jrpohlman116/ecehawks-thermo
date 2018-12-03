//establish socket connection
console.log('im in here');
var socket = io.connect('http://localhost:3000');

//query DOM
var temp = document.getElementById('curr-temp');

//listen for events
socket.on('temp', function(data){
	temp.innerHTML =  data ;
	console.log(data);
});