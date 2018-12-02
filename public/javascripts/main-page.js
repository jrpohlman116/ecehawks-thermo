const sensor = require('ds18b20-raspi');

function getTemp(){
  tempF = sensor.readSimpleF(1);
  tempF = Math.round(tempF)

  document.getElementById('curr-temp').innerHTML = tempF +  + '\u02DA';
  var t = setTimeout(getTempandLed, 1000);
}

function heat() {
    var button = document.getElementById('heat');
    var status = document.getElementById('hvac-status');
    if (status.innerText === 'Heat On'){
        status.innerText = 'OFF'
        button.style.backgroundColor = '#808080'
    }else{
        status.innerText = 'Heat On';
        button.style.backgroundColor = '#FFCD00'
        document.getElementById('auto').style.backgroundColor = '#808080'
        document.getElementById('ac').style.backgroundColor = '#808080'
    }
}

function ac() {
    var button = document.getElementById('ac');
    var status = document.getElementById('hvac-status');
    if (status.innerText === 'AC On'){
        status.innerText = 'OFF'
        button.style.backgroundColor = '#808080'
    }else{
        status.innerText = 'AC On';
        button.style.backgroundColor = '#FFCD00'
        document.getElementById('auto').style.backgroundColor = '#808080'
        document.getElementById('heat').style.backgroundColor = '#808080'
    }
}

function auto() {
    var button = document.getElementById('auto');
    var status = document.getElementById('hvac-status');
    if (status.innerText === 'Auto On'){
        status.innerText = 'OFF'
        button.style.backgroundColor = '#808080'
    }else{
        status.innerText = 'Auto On';
        button.style.backgroundColor = '#FFCD00'
        document.getElementById('heat').style.backgroundColor = '#808080'
        document.getElementById('ac').style.backgroundColor = '#808080'
    }
}

function hold() {
    var button = document.getElementById('hold');
    console.log(button.style.backgroundColor)
    if (button.style.backgroundColor == 'rgb(128, 128, 128)'){
        button.style.backgroundColor = '#FFCD00'
    }else{
        button.style.backgroundColor = '#808080'
    }
    
}