window.addEventListener("load", init);

// color pallet
// selected answer 
    // background-color: #809fff;
    // border: 2px solid #002db3;

// bad answer
    // background-color: #ffbfbf;
    // border: 2px solid #8f0000;

//good answer
    // background-color: #c0ffc0;
    // border: 2px solid #5ab35a;

var effect1 = document.getElementById('Sfx_effect');
effect1.volume = 0.2;

function PlayButtonSounds(num){
    if (num === 1) effect1.play();
}

function init(){
    addSelectEffectEvent();
    effectOnViewScoreButton('turn', 'side-one', 'side-two');
}

function addSelectEffectEvent(){
    document.getElementById('answer1').addEventListener('click', anwser1Selected); 
    document.getElementById('answer2').addEventListener('click', anwser2Selected); 
    document.getElementById('answer3').addEventListener('click', anwser3Selected); 
    document.getElementById('answer4').addEventListener('click', anwser4Selected);
}

function anwser1Selected(){
    PlayButtonSounds(1);
    document.getElementById('answer1-side-one').style.transform = 'rotateX(180deg)'; 
    document.getElementById('answer1-side-two').style.transform = 'rotateX(0deg)';
    document.getElementById('answer1-side-two').style.border = '2px solid #002db3';
    document.getElementById('answer1-side-two').style.background = '#809fff';
    removeAllSelectEvents();
    setTimeout(() => {
        checkAnwser('1', 'answer1-side-one', 'answer1-side-two');
    }, 4000);
}
function anwser2Selected(){
    PlayButtonSounds(1); 
    document.getElementById('answer2-side-one').style.transform = 'rotateX(180deg)'; 
    document.getElementById('answer2-side-two').style.transform = 'rotateX(0deg)';
    document.getElementById('answer2-side-two').style.border = '2px solid #002db3';
    document.getElementById('answer2-side-two').style.background = '#809fff';
    removeAllSelectEvents();
    setTimeout(() => {
        checkAnwser('2', 'answer2-side-one', 'answer2-side-two');
    }, 4000);
}
function anwser3Selected(){
    PlayButtonSounds(1);
    document.getElementById('answer3-side-one').style.transform = 'rotateX(180deg)'; 
    document.getElementById('answer3-side-two').style.transform = 'rotateX(0deg)';
    document.getElementById('answer3-side-two').style.border = '2px solid #002db3';
    document.getElementById('answer3-side-two').style.background = '#809fff';
    removeAllSelectEvents();
    setTimeout(() => {
        checkAnwser('3', 'answer3-side-one', 'answer3-side-two');
    }, 4000);
}
function anwser4Selected(){
    PlayButtonSounds(1);
    document.getElementById('answer4-side-one').style.transform = 'rotateX(180deg)'; 
    document.getElementById('answer4-side-two').style.transform = 'rotateX(0deg)';
    document.getElementById('answer4-side-two').style.border = '2px solid #002db3';
    document.getElementById('answer4-side-two').style.background = '#809fff';
    removeAllSelectEvents();
    setTimeout(() => {
        checkAnwser('4', 'answer4-side-one', 'answer4-side-two');
    }, 4000);
}

function removeAllSelectEvents(){
    document.getElementById('answer1').removeEventListener('click', anwser1Selected);
    document.getElementById('answer2').removeEventListener('click', anwser2Selected);
    document.getElementById('answer3').removeEventListener('click', anwser3Selected);
    document.getElementById('answer4').removeEventListener('click', anwser4Selected);
}

function effectOnViewScoreButton(buttonId, sideOne, sideTwo){
    document.getElementById(buttonId).addEventListener('click', () => {
        document.getElementsByClassName(sideOne)[0].style.transform = 'rotateX(180deg)';
        document.getElementsByClassName(sideTwo)[0].style.transform = 'rotateX(0deg)';
        document.getElementsByClassName(sideTwo)[0].style.background = '#809fff';
        document.getElementsByClassName(sideTwo)[0].style.border = '2px solid #002db3';
        setTimeout(()=>{
            document.getElementsByClassName(sideOne)[0].style.transform = 'rotateX(0deg)';
            document.getElementsByClassName(sideTwo)[0].style.transform = 'rotateX(-180deg)';
        }, 5000);
    });
}

function goodAnswer(sideOne, sideTwo){
    document.getElementById(sideOne).style.transform = 'rotateX(0deg)';
    document.getElementById(sideTwo).style.transform = 'rotateX(-180deg)';

    document.getElementById(sideOne).style.border = '2px solid #5ab35a';
    document.getElementById(sideOne).style.background = '#c0ffc0';
    document.getElementById(sideOne).style.color = '#000';
}

function wrongAnwser(sideOne, sideTwo){
    document.getElementById(sideOne).style.transform = 'rotateX(0deg)';
    document.getElementById(sideTwo).style.transform = 'rotateX(-180deg)';

    document.getElementById(sideOne).style.border = '2px solid #8f0000';
    document.getElementById(sideOne).style.background = '#ffbfbf';
    document.getElementById(sideOne).style.color = '#000';
}

async function checkAnwser(answer, sideOne, sideTwo){
    console.log(`anwser fifabtn.js : ${answer}`);
    const {data: correct} = await axios.post('/fifaSpelen/check',{
        answer: answer
    });
    if (correct) {
        goodAnswer(sideOne, sideTwo);
    }else{
        wrongAnwser(sideOne, sideTwo);
    }
}
