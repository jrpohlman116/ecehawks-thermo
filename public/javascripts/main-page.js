function hold() {
    var button = document.getElementById('hold');
    console.log(button.style.backgroundColor)
    if (button.style.backgroundColor == 'rgb(128, 128, 128)'){
        button.style.backgroundColor = '#FFCD00'
        button.value = '1'
    }else{
        button.style.backgroundColor = '#808080'
        button.value = '0'
    }
    
}