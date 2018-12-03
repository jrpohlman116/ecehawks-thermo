//establish socket connection
var socket = io.connect('http://localhost:3000');


var settemp = document.getElementById('desired-temp-label');
var up = document.getElementById('arrrow-up');
var down = document.getElementById('arrow-down');




// console.log("sending data")
// socket.emit('status', {
// 	heat: 0,
// 	ac: 1,
// 	auto: 0
// });

function heat(){
	var heatbtn = document.getElementById('heat');
	var acbtn = document.getElementById('ac');
	var autobtn = document.getElementById('auto');
	var status = document.getElementById('hvac-status');
	if (status.innerText === 'Heat On'){
		status.innerText = 'OFF'
		heatbtn.style.backgroundColor = '#808080'
		heatbtn.value = '0'
	}else{
		status.innerText = 'Heat On';
		heatbtn.style.backgroundColor = '#FFCD00'
		heatbtn.value = '1'
		document.getElementById('auto').style.backgroundColor = '#808080'
		document.getElementById('ac').style.backgroundColor = '#808080'
	}

	console.log('heat1 = ' + heatbtn.value);
	socket.emit('status', {
		heat: 1,
		ac: 0,
		auto: 0
	});
	console.log('heat2 = ' + heatbtn.value);
}	

function ac(){
	var heatbtn = document.getElementById('heat');
	var acbtn = document.getElementById('ac');
	var autobtn = document.getElementById('auto');
	var status = document.getElementById('hvac-status');
	if (status.innerText === 'AC On'){
		status.innerText = 'OFF'
		acbtn.style.backgroundColor = '#808080'
		acbtn.value = '0'
	}else{
		status.innerText = 'AC On';
		acbtn.value = '1'
		acbtn.style.backgroundColor = '#FFCD00'
		document.getElementById('auto').style.backgroundColor = '#808080'
		document.getElementById('heat').style.backgroundColor = '#808080'
	}

	console.log('ac1 = ' + heatbtn.value);
	socket.emit('status', {
		heat: 0,
		ac: 1,
		auto: 0
	});
	console.log('ac2 = ' + acbtn.value);
}	

function auto(){
	var heatbtn = document.getElementById('heat');
	var acbtn = document.getElementById('ac');
	var autobtn = document.getElementById('auto');
	var status = document.getElementById('hvac-status');
	if (status.innerText === 'Auto On'){
		status.innerText = 'OFF'
		autobtn.style.backgroundColor = '#808080'
		autobtn.value = '0'
	}else{
		status.innerText = 'Auto On';
		autobtn.style.backgroundColor = '#FFCD00'
		autobtn.value = '1'
		document.getElementById('heat').style.backgroundColor = '#808080'
		document.getElementById('ac').style.backgroundColor = '#808080'
	}

	console.log('auto1 = ' + heatbtn.value);
	socket.emit('status', {
		heat: 0,
		ac: 0,
		auto: 1
	});
	console.log('auto2 = ' + autobtn.value);		
}





// //set temp button
// 	up.addEventListener('click', function(){
// 		socket.emit('set', {
// 			stemp: parseInt(settemp.textContent)
// 		});
// 	});	

// 	down.addEventListener('click', function(){
// 		socket.emit('set', {
// 			stemp: parseInt(settemp.textContent)
// 		});
// 	});	



//listen for events
socket.on('temp', function(data){
	document.getElementById('curr-temp').innerHTML =  data + '\u02DA' ;
	console.log(data);
});