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
};
