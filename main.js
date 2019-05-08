var arr_divs = []
var colors = []
var temp = []
var arrColorsMap = new Map([])
var prev_button
var last_button
var flipped_colors = []
var click = 0;
var total = 0;
flag = false;

var timer = new Date().getTime();
var interval;

document.getElementById('container').onclick = function (event) { //слушание события onClick
    var target = event.target;
    setHandler(target.getAttribute('id'));
}

function onClickStart() {//при нажатии на кнопку старт
    interval = setInterval(function(){ //запуск секундомера
        if (timer==0) return;
        document.getElementById('timer').innerHTML = (new Date().getTime()-timer)/1000 
    },100);
    

    document.getElementById("startGame").disabled = true;//отключение кнопки
    setupInitialize();
    
}
function setupInitialize() {
 
    for (i = 1; i <= 16; i++) {

        var html_element = document.getElementById(i);
        arr_divs.push(html_element)

    }
    setArrColorsMap()//установка в массив с цветами hex-парных значений.
}
function getRandomColor() {//функция, генерирующая рандомный цвет
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}
function getRandomArbitrary(min, max) { //генерация рандомного числа в промежутке
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function setHandler(i) { // функция обрабатывающая айдишник нажатого элемента
    if(document.getElementById(i).className == 'correct'){
        return;
    }
    var colorToRelize = arrColorsMap.get(parseInt(i));
    click += 1;
    if(click === 2){ // проверка на непервое нажатие
        flag = true;
    }else{
        flag = false;
    }
    document.getElementById(i).style.backgroundColor = colorToRelize;
    if(flag){
        
        if(arrColorsMap.get(prev_button) === arrColorsMap.get(parseInt(i)) && prev_button != parseInt(i)){ //проверка на цвет
            
            document.getElementById(prev_button).className = 'correct';
            document.getElementById(parseInt(i)).className = 'correct';
            total += 2;
            document.getElementById(parseInt(i)).style.backgroundColor = arrColorsMap.get(parseInt(i));
            document.getElementById(prev_button).style.backgroundColor = arrColorsMap.get(parseInt(i));
            
        }else{
            last_button = parseInt(i); 
            setTimeout(clearColors(prev_button, last_button), 300);
        }

        flag = false;
        click = 0;
    }

    if(total == 16){ // отслеживание на количество найденных пар и конец игры
        console.log(interval);
        stopTimer();
        return alert("Ваш результат:" + (new Date().getTime()-timer)/1000 );

    }
    
    prev_button = parseInt(i);
}

function clearColors(prev_button, last_button){ // очитска последних нажатых кнопок

    return function(){
        document.getElementById(last_button).style.backgroundColor = 'white';
        document.getElementById(prev_button).style.backgroundColor = 'white';
    }
}

function setArrColorsMap() {//заполнение массива неодинаковыми  парными цветами 
    while (arrColorsMap.size != 16) {
        var randColor = getRandomColor()

        var randomNum1 = getRandomArbitrary(1, 16)
        var randomNum2 = getRandomArbitrary(1, 16)

        if (temp.indexOf(randomNum1) == -1 && temp.indexOf(randomNum2) == -1 && randomNum1 != randomNum2) {
            temp.push(randomNum1)
            temp.push(randomNum2)
            arrColorsMap.set(randomNum1, randColor)
            arrColorsMap.set(randomNum2, randColor)

        }

    }
}
function stopTimer () {
    clearInterval(interval);
}



