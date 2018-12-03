//establish socket connection
var socket = io.connect('http://localhost:3000');

	var heatbtn = document.getElementById('heat');
	var acbtn = document.getElementById('ac');
	var autobtn = document.getElementById('auto');
	var settemp = document.getElementById('desired-temp-label');
	var up = document.getElementById('arrrow-up');
	var down = document.getElementById('arrow-down');


if(heatbtn && acbtn && autobtn && settemp && up && down){
//state change

	heatbtn.addEventListener('click', function(){
		socket.emit('status', {
			heat: heatbtn.value,
			ac: acbtn.value,
			auto: autobtn.value
		});
		console.log('heat = ' + heatbtn.value);
	});	

	acbtn.addEventListener('click', function(){
		socket.emit('status', {
			heat: heatbtn.value,
			ac: acbtn.value,
			auto: autobtn.value
		});
		console.log('heat = ' + acbtn.value);
	});	

	autobtn.addEventListener('click', function(){
		socket.emit('status', {
			heat: heatbtn.value,
			ac: acbtn.value,
			auto: autobtn.value
		});
		console.log('heat = ' + autobtn.value);		
	});	





//set temp button
	up.addEventListener('click', function(){
		socket.emit('set', {
			stemp: prarseInt(settemp.textContent)
		});
	});	

	down.addEventListener('click', function(){
		socket.emit('set', {
			stemp: prasrInt(settemp.textContent)
		});
	});	
}


//listen for events
socket.on('temp', function(data){
	document.getElementById('curr-temp').innerHTML =  data + '\u02DA' ;
	console.log(data);
});