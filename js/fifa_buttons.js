window.addEventListener("load", init);

// selected answer 
// background-color: #809fff;
// border: 2px solid #002db3;

//good answer
// background-color: #c0ffc0;
// border: 2px solid #5ab35a;

// bad answer
// background-color: #ffbfbf;
// border: 2px solid #8f0000;

function init(){
    selectButtonEffect('anwser1', 'answer1-side-one', 'answer1-side-two');
    selectButtonEffect('anwser2', 'answer2-side-one', 'answer2-side-two');
    selectButtonEffect('anwser3', 'answer3-side-one', 'answer3-side-two');
    selectButtonEffect('anwser4', 'answer4-side-one', 'answer4-side-two');
    e('turn', 'side-one', 'side-two')
}

function selectButtonEffect(button, sideOne, sideTwo){
    console.log({button, sideTwo, sideOne})
    let clickOnBtn = document.getElementsByClassName(button);
    clickOnBtn[0].addEventListener('click', ()=>{
        console.log(`Click button: ${button}  -  ${document.getElementById(sideTwo).value}`)
        document.getElementById(sideOne).style.transform = 'rotateX(180deg)'; 
        document.getElementById(sideTwo).style.transform = 'rotateX(0deg)';
        document.getElementById(sideTwo).style.border = '2px solid #002db3';
        document.getElementById(sideTwo).style.background = '#809fff';
    });
    
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

function goodAnswer(){
    
}

function wrongAnwser(){

}
