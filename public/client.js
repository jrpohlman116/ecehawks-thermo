//establish socket connection
var socket = io.connect('http://localhost:3000');


var settemp = document.getElementById('desired-temp-label');
var up = document.getElementById('arrrow-up');
var down = document.getElementById('arrow-down');


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

	socket.emit('status', {
		heat: 1,
		ac: 0,
		auto: 0
	});
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

	socket.emit('status', {
		heat: 0,
		ac: 1,
		auto: 0
	});
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

	socket.emit('status', {
		heat: 0,
		ac: 0,
		auto: 1
	});
}

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

	socket.emit('time', {
		offsettime: offset
	});
  console.log("it's done in client");
}

//listen for events
socket.on('temp', function(data){
	document.getElementById('curr-temp').innerHTML =  data + '\u02DA' ;
	console.log(data);
});