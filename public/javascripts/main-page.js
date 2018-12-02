function heat() {
    var status = document.getElementById('hvac-status');
    if (status.innerText === 'Heat On'){
        status.innerText = 'OFF'
    }else{
        status.innerText = 'Heat On';
    }

    console.log('heat')
}

function ac() {
    var status = document.getElementById('hvac-status');
    if (status.innerText === 'AC On'){
        status.innerText = 'OFF'
    }else{
        status.innerText = 'AC On';
    }
}

function auto() {
    var status = document.getElementById('hvac-status');
    if (status.innerText === 'Auto On'){
        status.innerText = 'OFF'
    }else{
        status.innerText = 'Auto On';
    }
}