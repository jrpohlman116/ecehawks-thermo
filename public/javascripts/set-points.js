function onDaySelectionClick(enable, disable) {
    var x = document.getElementById("schedule-selecter-container");
    x.style.display = "flex"; 
    document.getElementById(enable).style.backgroundColor = '#FFCD00'
    document.getElementById(disable).style.backgroundColor = '#808080'
} 

function onSetPointClick(name) {
    var x = document.getElementById("enable-edit-container");
    x.style.display = "flex";

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
  } else {
    onoff.innerText = "OFF";
  }
}
