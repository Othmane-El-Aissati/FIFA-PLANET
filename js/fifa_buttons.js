window.addEventListener("load", init);


// selected answer 
// background-color: #809fff;
// border: 2px solid #002db3;


// bad answer
// background-color: #ffbfbf;
// border: 2px solid #8f0000;

var effect1 = document.getElementById('Sfx_effect');
effect1.volume = 0.2;

function PlayButtonSounds(num){
    if (num === 1) effect1.play();
}

function init(){
    let a4 = document.getElementById('answer4');
    console.log(a4)
    document.getElementById('answer1').addEventListener('click', anwser1Selected); 
    document.getElementById('answer2').addEventListener('click', anwser2Selected); 
    document.getElementById('answer3').addEventListener('click', anwser3Selected); 
    document.getElementById('answer4').addEventListener('click', anwser4Selected); 
    e('turn', 'side-one', 'side-two');
}

function anwser1Selected(){
    PlayButtonSounds(1);
    document.getElementById('answer1-side-one').style.transform = 'rotateX(180deg)'; 
    document.getElementById('answer1-side-two').style.transform = 'rotateX(0deg)';
    document.getElementById('answer1-side-two').style.border = '2px solid #002db3';
    document.getElementById('answer1-side-two').style.background = '#809fff';
    removeSelectEvent();

    setTimeout(goodAnswer, 3000);
}
function anwser2Selected(){
    PlayButtonSounds(1); 
    document.getElementById('answer2-side-one').style.transform = 'rotateX(180deg)'; 
    document.getElementById('answer2-side-two').style.transform = 'rotateX(0deg)';
    document.getElementById('answer2-side-two').style.border = '2px solid #002db3';
    document.getElementById('answer2-side-two').style.background = '#809fff';
    removeSelectEvent();

    setTimeout(wrongAnwser, 3000);
}
function anwser3Selected(){
    PlayButtonSounds(1);
    document.getElementById('answer3-side-one').style.transform = 'rotateX(180deg)'; 
    document.getElementById('answer3-side-two').style.transform = 'rotateX(0deg)';
    document.getElementById('answer3-side-two').style.border = '2px solid #002db3';
    document.getElementById('answer3-side-two').style.background = '#809fff';
    removeSelectEvent();
    
}
function anwser4Selected(){
    PlayButtonSounds(1);
    document.getElementById('answer4-side-one').style.transform = 'rotateX(180deg)'; 
    document.getElementById('answer4-side-two').style.transform = 'rotateX(0deg)';
    document.getElementById('answer4-side-two').style.border = '2px solid #002db3';
    document.getElementById('answer4-side-two').style.background = '#809fff';
    removeSelectEvent();
}

function removeSelectEvent(){
    document.getElementById('answer1').removeEventListener('click', anwser1Selected);
    document.getElementById('answer2').removeEventListener('click', anwser2Selected);
    document.getElementById('answer3').removeEventListener('click', anwser3Selected);
    document.getElementById('answer4').removeEventListener('click', anwser4Selected);
}


function e(a, b, c){
    document.getElementById(a).addEventListener('click', () => {
        document.getElementsByClassName(b)[0].style.transform = 'rotateX(180deg)';
        document.getElementsByClassName(c)[0].style.transform = 'rotateX(0deg)';
        document.getElementsByClassName(c)[0].style.background = '#809fff';
        document.getElementsByClassName(c)[0].style.border = '2px solid #002db3';
        setTimeout(()=>{
            document.getElementsByClassName(b)[0].style.transform = 'rotateX(0deg)';
            document.getElementsByClassName(c)[0].style.transform = 'rotateX(-180deg)';
        }, 5000);
    });
}

function setChosenAnswer(chosen){
    return function getChosenAnswer(){
        return chosen;
    };
}

function goodAnswer(){
    //good answer
    // background-color: #c0ffc0;
    // border: 2px solid #5ab35a;
    document.getElementById('answer1-side-one').style.transform = 'rotateX(0deg)';
    document.getElementById('answer1-side-two').style.transform = 'rotateX(-180deg)';

    document.getElementById('answer1-side-one').style.border = '2px solid #5ab35a';
    document.getElementById('answer1-side-one').style.background = '#c0ffc0';
    document.getElementById('answer1-side-one').style.color = '#000';
}

function wrongAnwser(){
    // bad answer
    // background-color: #ffbfbf;
    // border: 2px solid #8f0000;
    document.getElementById('answer2-side-one').style.transform = 'rotateX(0deg)';
    document.getElementById('answer2-side-two').style.transform = 'rotateX(-180deg)';

    document.getElementById('answer2-side-one').style.border = '2px solid #8f0000';
    document.getElementById('answer2-side-one').style.background = '#ffbfbf';
    document.getElementById('answer2-side-one').style.color = '#000';
}
