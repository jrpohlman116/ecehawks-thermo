
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

function adjustMonth(direction){
    let dialText = document.getElementById('month-text');
    let month = parseInt(dialText.textContent);

    
    if(direction === 'up'){
        if(month === 12){
            dialText.innerText = '0' + (1).toString();
        }else{
            month++;
            if (month < 10){
                dialText.innerText = '0' + (month).toString();
            }else{
                dialText.innerText = (month).toString();
            }
        }

        
    }
    else if(direction === 'down'){
        if(month === 1){
            dialText.innerText = (12).toString();
        }else{
            month--;
            if (month < 10){
                dialText.innerText = '0' + (month).toString();
            }else{
                dialText.innerText = (month).toString();
            }
        }
    }
}



function adjustDay(direction){
    const shortMonths = [4, 6, 9, 11]
    const longMonths = [1, 3, 5, 7, 8, 10, 12]
    let dialText = document.getElementById('day-text');
    let day = parseInt(dialText.textContent);
    let month = document.getElementById('month-text').textContent;


    
    if(direction === 'up'){
        if((shortMonths.includes(month) && day === 30) || (longMonths.includes(month) && day === 31 || (day ===28 && month === 2))){
            dialText.innerText = '0' + (1).toString();
        }else{
            day++;
            if (day < 10){
                dialText.innerText = '0' + (day).toString();
            }else{
                dialText.innerText = (day).toString();
            }
        }
    }
    else if(direction === 'down'){
        if(day === 1 && shortMonths.includes(month)){
            dialText.innerText = (30).toString();
        }
        else if(day === 1 && longMonths.includes(month)){
            dialText.innerText = (31).toString();
        }
        else if(day === 1 && month === 2){
            dialText.innerText = (28).toString();
        }else{
            day--;
            if (day < 10){
                dialText.innerText = '0' + (day).toString();
            }else{
                dialText.innerText = (day).toString();
            }
        }
    }
}

function adjustYear(direction){
    let dialText = document.getElementById('year-text');
    let year = parseInt(dialText.textContent);

    if(direction === 'up'){
        if(year !== new Date().getFullYear() + 2){
            dialText.innerText = (year + 1).toString();
        }
    }
    else if(direction === 'down'){
        if(year !== 1988){
            dialText.innerText = (year - 1).toString();
        }
    }
}