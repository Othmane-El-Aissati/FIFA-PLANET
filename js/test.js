let footer = document.getElementsByTagName('footer');
let div = document.getElementsByTagName('body');
let hasVerticalScrollbar = div.scrollHeight > div.clientHeight;

let check = () => {
    if (footer.hasVerticalScrollbar) {
        footer.style.position = "absolute";
        alert("We got here")
    }
}

check();