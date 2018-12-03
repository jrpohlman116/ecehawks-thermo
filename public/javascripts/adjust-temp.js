function adjustTempOnly(direction, id){
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
}