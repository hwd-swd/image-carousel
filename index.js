
let pageLoad = function(){
    imageLoad();
    buttonDOM();
    timer();
};

let imageLoad = function(){
    const frame = document.querySelector('#frame');
    const statusBar = document.querySelector('.statusBar');

    for(let i=0;i<24;i++){
        let picture = document.createElement('img');
        picture.setAttribute('class',`img-${i}`);
        picture.src = `./imgs/${i}.jpg`;
        frame.appendChild(picture);

        statusBar.appendChild(createStatus(i))

    };
    document.querySelector('.img-0').setAttribute('id','visible');
    document.querySelector('.s-0').setAttribute('id','active');
};

let createStatus = function(i){
    let container = document.createElement('i');
    container.classList.add('statusContainer');
    container.classList.add('fas');
    container.classList.add('fa-circle');
    container.classList.add(`s-${i}`);
    container.setAttribute('value',i);
    return container
};

let buttonDOM = function(){
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button=>button.addEventListener('click',imageClick));
    window.addEventListener('keydown',keyPress);
    const statuses = document.querySelectorAll('.statusContainer');
    statuses.forEach(status=>status.addEventListener('click',statusClick))
};

let keyPress = function(e){
    const direction = e.keyCode.toString();
    let currentImage = document.getElementById('visible');
    let imageNumber = currentImage.getAttribute('class').split('-')[1];
    if(direction=='37'||direction=='39'){
        let nextImageNumber = nextNumber(imageNumber,direction);
        nextImage(nextImageNumber);
    }
}

let statusClick = function(e){
    let imageNumber = e.target.getAttribute('value');
    console.log(imageNumber);
    nextImage(imageNumber);
};

let imageClick = function(e){
    const direction = e.target.getAttribute('value');
    let currentImage = document.getElementById('visible');
    let imageNumber = currentImage.getAttribute('class').split('-')[1];
    let nextImageNumber = nextNumber(imageNumber,direction);
    nextImage(nextImageNumber);
};


let nextNumber = function(imageNumber,direction){
    let adder;
    switch(direction){
        case 'Left':
            adder=-1;
            break;
        case 'Right':
            adder=1;
            break;
        case '37':
            adder=-1;
            break;
        case '39':
            adder=1;
    }
    return (parseInt(imageNumber)+adder+24)%24
};

let nextImage = function(nextImageNumber){
    let currentImage = document.getElementById('visible');
    let currentStatus = document.getElementById('active');

    currentImage.removeAttribute('id','visible');
    currentStatus.removeAttribute('id','active');

    const nextImage = document.querySelector(`.img-${nextImageNumber}`);
    nextImage.setAttribute('id','visible');
    const nextStatus = document.querySelector(`.s-${nextImageNumber}`);
    nextStatus.setAttribute('id','active');
};

let timer = function(){
    setInterval(function(){
        let currentImage = document.getElementById('visible');
        let imageNumber = currentImage.getAttribute('class').split('-')[1];
        let nextImageNumber = nextNumber(imageNumber,'39');
        nextImage(nextImageNumber);
    },5000);
};

pageLoad();
