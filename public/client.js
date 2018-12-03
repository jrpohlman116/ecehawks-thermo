//establish socket connection
var socket = io.connect('http://localhost:3000');

var offset = 0;

var weekday = 0
var weekend = 0
var setpointNum = 0		//set point number 1-4
var isActive = 0		//onoff
var setpointTemp = 0	//setpoint temp val
var setpointTime = 0	//setpoint time val
var setpointMode = 0	//auto heat or cool		



var timeInterval = setInterval(updateOffset, 2000);

function updateOffset(){
	socket.emit('time', {
		offsettime: offset
	});
	
	socket.emit('setpoint', function(data){
		weekday: weekday
		weekdend: weekend
		setpointNum: setpointNum
		isActive: isActive
		setpointTemp: setpointTemp
		setpointTime: setpointTime
		setpointMode: setpointMode

	});

}

var settemp = document.getElementById('desired-temp-label');
var up = document.getElementById('arrrow-up');
var down = document.getElementById('arrow-down');

//listen for events
socket.on('temp', function(data){
	document.getElementById('curr-temp').innerHTML =  data + '\u02DA' ;
	//console.log(data);
});




socket.on('time', function(data){
	offset = data.offsettime
})

socket.on('setpoint', function(data){
	weekday = data.weekday
	weekend = data.weekend
	setpointNum = data. setpointNum
	isActive = data.isActive
	setpointTemp = data.setpointTemp
	setpointTime = data.setpointTime
	setpointMode = data.setpointMode
})



var heatIsColored = false;
var acIsColored = false;
var autoIsColored = false;

var settemp = document.getElementById('desired-temp-label');

function heat(){
	var heatbtn = document.getElementById('heat');
	if (heatIsColored){
		heatbtn.style.backgroundColor = '#808080'
			
		setpointMode = 0
		heatIsColored = false;
	}else{
		heatIsColored = true;
		heatbtn.style.backgroundColor = '#FFCD00'
		document.getElementById('auto').style.backgroundColor = '#808080'
		document.getElementById('ac').style.backgroundColor = '#808080'
		
		setpointMode = 2
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
		setpointMode = 0
		acIsColored = false
	}else{
		acbtn.style.backgroundColor = '#FFCD00'
		document.getElementById('auto').style.backgroundColor = '#808080'
		document.getElementById('heat').style.backgroundColor = '#808080'
		acIsColored = true
		setpointMode = 1
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
		
		setpointMode = 0
		autoIsColored = false;
	}else{
		autobtn.style.backgroundColor = '#FFCD00'
		autoIsColored = true;
		document.getElementById('heat').style.backgroundColor = '#808080'
		document.getElementById('ac').style.backgroundColor = '#808080'
		
		setpointMode = 3
	}

	socket.emit('status', {
		heat: 0,
		ac: 0,
		auto: 1
	});
}

function updateJSON(){
	// document.getElementById('save-btn').style.display = 'hide'

	let year = parseInt(document.getElementById('year-text').innerHTML)
	let month = parseInt(document.getElementById('month-text').innerHTML)
	let day = parseInt(document.getElementById('day-text').innerHTML)
	let hour = parseInt(document.getElementById('hour-text').innerHTML)
	let minute = parseInt(document.getElementById('minute-text').innerHTML)

	let today = new Date();
	let userDate = new Date(year, month, day, hour, minute);
	offset = Math.abs(today.getMilliseconds()-userDate.getMilliseconds());


	socket.emit('time', {
		offsettime: offset
	});
	console.log("it's done in client offse = " + offset);
}


function onDaySelectionClick(enable, disable) {
    var x = document.getElementById("schedule-selecter-container");
	x.style.display = "flex"; 
	document.getElementById(enable).style.backgroundColor = '#FFCD00'
	document.getElementById(disable).style.backgroundColor = '#808080'
	
	if (enable == 'Weekdays'){
		weekday = 1
		weekend = 0
	}else{
		weekend = 1
		weekday = 0
	}

    document.getElementById('1').style.backgroundColor = '#FFCD00'
    document.getElementById('2').style.backgroundColor = '#808080'
    document.getElementById('3').style.backgroundColor = '#808080'
    document.getElementById('4').style.backgroundColor = '#808080'
} 

function onSetPointClick(name) {
    var x = document.getElementById("enable-edit-container");
	x.style.display = "flex";
	setpointNum = parseInt(name)

    if(name == '1'){
      document.getElementById(name).style.backgroundColor = '#FFCD00'
      document.getElementById('2').style.backgroundColor = '#808080'
      document.getElementById('3').style.backgroundColor = '#808080'
      document.getElementById('4').style.backgroundColor = '#808080'
    }else if (name == '2'){
      document.getElementById(name).style.backgroundColor = '#FFCD00'
      document.getElementById('1').style.backgroundColor = '#808080'
      document.getElementById('3').style.backgroundColor = '#808080'
      document.getElementById('4').style.backgroundColor = '#808080'
    }else if (name == '3'){
      document.getElementById(name).style.backgroundColor = '#FFCD00'
      document.getElementById('2').style.backgroundColor = '#808080'
      document.getElementById('1').style.backgroundColor = '#808080'
      document.getElementById('4').style.backgroundColor = '#808080'
    }else{
      document.getElementById(name).style.backgroundColor = '#FFCD00'
      document.getElementById('2').style.backgroundColor = '#808080'
      document.getElementById('3').style.backgroundColor = '#808080'
      document.getElementById('1').style.backgroundColor = '#808080'
    }
}

function enableDisableSetPoint() {
	// Get the checkbox
	var checkBox = document.getElementById("setpoint-check");
	// Get the output text
	var onoff = document.getElementById("onoff-text");
  
	console.log(onoff);
  
	// If the checkbox is checked, display the output text
	if (checkBox.checked == true){
	  onoff.innerText = "ON";
	  isActive = 1
	} else {
	  onoff.innerText = "OFF";
	  isActive = 0
	}
}


function adjustHour(direction){
    let dialText = document.getElementById('hour-text');
    let hour = parseInt(dialText.textContent);

    
    if(direction === 'up'){
        if(hour === 12){
            dialText.innerText = '0' + (1).toString();
        }else{
            hour++;
            if (hour < 10){
                dialText.innerText = '0' + (hour).toString();
            }else{
                dialText.innerText = (hour).toString();
            }
        }

        
    }
    else if(direction === 'down'){
        if(hour === 1){
            dialText.innerText = (12).toString();
        }else{
            hour--;
            if (hour < 10){
                dialText.innerText = '0' + (hour).toString();
            }else{
                dialText.innerText = (hour).toString();
            }
        }
    }
}

function adjustMinute(direction){
    let dialText = document.getElementById('minute-text');
    let minute = parseInt(dialText.textContent);

    
    if(direction === 'up'){
        if(minute === 59){
            dialText.innerText = '0' + (0).toString();
        }else{
            minute++;
            if (minute < 10){
                dialText.innerText = '0' + (minute).toString();
            }else{
                dialText.innerText = (minute).toString();
            }
        }

        
    }
    else if(direction === 'down'){
        if(minute === 0){
            dialText.innerText = (59).toString();
        }else{
            minute--;
            if (minute < 10){
                dialText.innerText = '0' + (minute).toString();
            }else{
                dialText.innerText = (minute).toString();
            }
        }
    }
}

function adjustAMPM(){
    let dialText = document.getElementById('ampm-text');
    let ampm = dialText.textContent;

    if(ampm === 'AM'){
        dialText.innerText = 'PM';
    }
    else if(ampm === 'PM'){
        dialText.innerText = 'AM';
    }
}




/*

function setpointJSON(){
	console.log('in setpoint json')

	socket.emit('setpointday', {
		isActive: isActive,
		weekday: weekday,
		weekend: weekend,
		setpointNum: setpointNum
	});
}

function settimeJSON(){
	console.log('in setpTIME JSON')

	let hour = parseInt(document.getElementById('hour-text').innerHTML)
	let minute = parseInt(document.getElementById('minute-text').innerHTML)
	let ampm = document.getElementById('ampm-text').innerHTML

	if (ampm === 'PM') {
		hour += 12;
	} else if (ampm = 'AM' && hour === 12) {
		hour = 0;
	}

	let userDate = new Date();
	userDate.setHours(hour);
	userDate.setMinutes(minute);
	setpointTime = userDate.getMilliseconds();

	socket.emit('setpointtime', {
		setpointTime: setpointTime
	});
}

function settempJSON(){
	console.log('in setTEMP json')

	setpointTemp = document.getElementById('scheduler-temp').innerHTML
	setpointMode = mode
	socket.emit('setpointtemp', {
		setpointTemp: 1,//setpointTemp,
		setpointMode: 0//setpointMode
	});	

	console.log('done setTEMP json temp: ' + setpointTemp + ' mode: ' + setpointMode)
}
*/





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
