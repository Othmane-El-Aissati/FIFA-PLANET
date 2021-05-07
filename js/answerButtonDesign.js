window.addEventListener("load", init);
const styleSheetNumber = 3;
function init(){
    let clickOnBtn = document.querySelector(".btn-wrapper");
    clickOnBtn.addEventListener("click", () => {
        console.log(document.styleSheets[styleSheetNumber]);
        document.styleSheets[styleSheetNumber].addRule('.btn-wrapper::before', 'transition: 1s');
        document.styleSheets[styleSheetNumber].addRule('.btn-wrapper::after', 'transition: 1s');
        document.styleSheets[styleSheetNumber].addRule('.btn-wrapper::before', 'width: 0px;');
        document.styleSheets[styleSheetNumber].addRule('.btn-wrapper::after', 'height: 0px');
        setTimeout(() => {
            document.styleSheets[styleSheetNumber].addRule('.btn-wrapper::before', 'border: 0px');
            document.styleSheets[styleSheetNumber].addRule('.btn-wrapper::after', 'border: 0px');
            clickOnBtn.style.background = "#bfcfff";
            clickOnBtn.style.border = "2px solid #002db3"; 
        }, 1000);
    }
    );
}