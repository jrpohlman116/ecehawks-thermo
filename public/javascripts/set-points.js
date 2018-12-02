function onDaySelectionClick(name) {
    var x = document.getElementById("schedule-selecter-container");
    x.style.display = "flex";
} 

function onSetPointClick(name) {
    var x = document.getElementById("enable-edit-container");
    x.style.display = "flex";
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
