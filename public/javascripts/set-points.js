function onDaySelectionClick(name) {
    var x = document.getElementById("schedule-selecter-container");
    if (x.style.display === "none") {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
} 

function onSetPointClick(name) {
    var x = document.getElementById("enable-edit-container");
    if (x.style.display === "none") {
        x.style.display = "flex";
    } else {
        x.style.display = "none";
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
