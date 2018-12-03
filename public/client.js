//establish socket connection
var socket = io.connect('http://localhost:3000');
var heatIsColored = false;
var acIsColored = false;
var autoIsColored = false;

var settemp = document.getElementById('desired-temp-label');

function heat(){
	var heatbtn = document.getElementById('heat');
	if (heatIsColored){
		heatbtn.style.backgroundColor = '#808080'
		heatIsColored = false;
	}else{
		heatIsColored = true;
		heatbtn.style.backgroundColor = '#FFCD00'
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
	var acbtn = document.getElementById('ac');
	if (acIsColored){
		acbtn.style.backgroundColor = '#808080'
		acIsColored = false
	}else{
		acbtn.style.backgroundColor = '#FFCD00'
		document.getElementById('auto').style.backgroundColor = '#808080'
		document.getElementById('heat').style.backgroundColor = '#808080'
		acIsColored = true
	}

	socket.emit('status', {
		heat: 0,
		ac: 1,
		auto: 0
	});
}	

function auto(){
	var autobtn = document.getElementById('auto');
	if (autoIsColored){
		autobtn.style.backgroundColor = '#808080'
		autoIsColored = false;
	}else{
		autobtn.style.backgroundColor = '#FFCD00'
		autoIsColored = true;
		document.getElementById('heat').style.backgroundColor = '#808080'
		document.getElementById('ac').style.backgroundColor = '#808080'
	}

	socket.emit('status', {
		heat: 0,
		ac: 0,
		auto: 1
	});	
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
});

//listen for events
socket.on('temp', function(data){
	document.getElementById('curr-temp').innerHTML =  data + '\u02DA' ;
});