//establish socket connection
var socket = io.connect('http://localhost:3000');

	var heatbtn = document.getElementById('heat');
	var acbtn = document.getElementById('ac');
	var autobtn = document.getElementById('auto');
	var settemp = document.getElementById('desired-temp-label');
	var up = document.getElementById('arrrow-up');
	var down = document.getElementById('arrow-down');




	console.log("sending data")
	socket.emit('status', {
		heat: 0,
		ac: 1,
		auto: 0
	});

	function heat(){
		var button = document.getElementById('heat');
		var status = document.getElementById('hvac-status');
		if (status.innerText === 'Heat On'){
			status.innerText = 'OFF'
			button.style.backgroundColor = '#808080'
			button.value = '0'
		}else{
			status.innerText = 'Heat On';
			button.style.backgroundColor = '#FFCD00'
			button.value = '1'
			document.getElementById('auto').style.backgroundColor = '#808080'
			document.getElementById('ac').style.backgroundColor = '#808080'
		}

		console.log('heat1 = ' + heatbtn.value);
		socket.emit('status', {
			heat: heatbtn.value,
			ac: acbtn.value,
			auto: autobtn.value
		});
		console.log('heat2 = ' + heatbtn.value);
	}	

	function ac(){
		var button = document.getElementById('ac');
		var status = document.getElementById('hvac-status');
		if (status.innerText === 'AC On'){
			status.innerText = 'OFF'
			button.style.backgroundColor = '#808080'
			button.value = '0'
		}else{
			status.innerText = 'AC On';
			button.value = '1'
			button.style.backgroundColor = '#FFCD00'
			document.getElementById('auto').style.backgroundColor = '#808080'
			document.getElementById('heat').style.backgroundColor = '#808080'
		}
	
		console.log('ac1 = ' + heatbtn.value);
		socket.emit('status', {
			heat: heatbtn.value,
			ac: acbtn.value,
			auto: autobtn.value
		});
		console.log('ac2 = ' + acbtn.value);
	});	

	function auto(){
		var button = document.getElementById('auto');
		var status = document.getElementById('hvac-status');
		if (status.innerText === 'Auto On'){
			status.innerText = 'OFF'
			button.style.backgroundColor = '#808080'
			button.value = '0'
		}else{
			status.innerText = 'Auto On';
			button.style.backgroundColor = '#FFCD00'
			button.value = '1'
			document.getElementById('heat').style.backgroundColor = '#808080'
			document.getElementById('ac').style.backgroundColor = '#808080'
		}
	
		console.log('auto1 = ' + heatbtn.value);
		socket.emit('status', {
			heat: heatbtn.value,
			ac: acbtn.value,
			auto: autobtn.value
		});
		console.log('auto2 = ' + autobtn.value);		
	});	





//set temp button
	up.addEventListener('click', function(){
		socket.emit('set', {
			stemp: parseInt(settemp.textContent)
		});
	});	

	down.addEventListener('click', function(){
		socket.emit('set', {
			stemp: parseInt(settemp.textContent)
		});
	});	



//listen for events
socket.on('temp', function(data){
	document.getElementById('curr-temp').innerHTML =  data + '\u02DA' ;
	console.log(data);
});