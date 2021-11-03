'use strict';

let modalIsVisible = false;
const modalWrapper = document.querySelector(".overlay");
const toggleModal = () => {
    modalIsVisible = !modalIsVisible;
    modalWrapper.style.opacity = modalIsVisible ? "1" : "0";
}

const buttons = document.querySelectorAll("button");
for(let i = 0; i < buttons.length; i += 1) {
    buttons[i].addEventListener("click", () => {
        toggleModal();
    });
}

modalWrapper.addEventListener("click", (event) => {
    if(event.target.className == "overlay") {
        toggleModal();
    } 
});