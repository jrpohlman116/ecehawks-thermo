//establish socket connection
var socket = io.connect('http://localhost:3000');
var heatIsColored = false;
var acIsColored = false;
var autoIsColored = false;

var settemp = document.getElementById('desired-temp-label');

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
	if (heatIsColored){
		status.innerText = 'OFF'
		heatbtn.style.backgroundColor = '#808080'
		heatIsColored = false;
	}else{
		status.innerText = 'Heat On';
		heatIsColored = true;
		heatbtn.style.backgroundColor = '#FFCD00'
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
	if (acIsColored){
		status.innerText = 'OFF'
		acbtn.style.backgroundColor = '#808080'
		acIsColored = false
	}else{
		status.innerText = 'AC On';
		acbtn.style.backgroundColor = '#FFCD00'
		document.getElementById('auto').style.backgroundColor = '#808080'
		document.getElementById('heat').style.backgroundColor = '#808080'
		acIsColored = true
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
	if (autoIsColored){
		status.innerText = 'OFF'
		autobtn.style.backgroundColor = '#808080'
		autoIsColored = false;
	}else{
		status.innerText = 'Auto On';
		autobtn.style.backgroundColor = '#FFCD00'
		autoIsColored = true;
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

function adjustTemp(direction, id){
    let dialText = document.getElementById(id);
    let temp = parseInt(dialText.textContent);

    if(direction === 'up'){
        if(temp !== 80){
            dialText.innerText = (temp + 1).toString() + '\u02DA';
        }
    }
    else if(direction === 'down'){
        if(temp !== 50){
            dialText.innerText = (temp - 1).toString() + '\u02DA';
        }
	}
	
	socket.emit('set', {
		stemp: temp
	});
}

//listen for events
socket.on('hvac-status', function(data){
	document.getElementById('hvac-status').innerHTML =  data;
	console.log(data);
});

//listen for events
socket.on('temp', function(data){
	document.getElementById('curr-temp').innerHTML =  data + '\u02DA' ;
	console.log(data);
});