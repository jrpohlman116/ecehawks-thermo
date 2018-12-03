//establish socket connection
console.log('im in here');
var socket = io.connect('http://localhost:3000');

	var heatbtn = document.getElementById('heat');
	var acbtn = document.getElementById('ac');
	var autobtn = document.getElementById('auto');

heatbtn.addEventListener('click', function(){
	socket.emit('status', {
		heat: heatbtn.value,
		ac: acbtn.value,
		auto: autobtn.value
	});
});	

acbtn.addEventListener('click', function(){
	socket.emit('status', {
		heat: heatbtn.value,
		ac: acbtn.value,
		auto: autobtn.value
	});
});	

autobtn.addEventListener('click', function(){
	socket.emit('status', {
		heat: heatbtn.value,
		ac: acbtn.value,
		auto: autobtn.value
	});
});	



//listen for events
socket.on('temp', function(data){
	document.getElementById('curr-temp').innerHTML =  data + '\u02DA' ;
	console.log(data);
});