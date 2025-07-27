'use strict'; /* Catches silent errors, prevents dangerous features, improves performance, makes 'this' behave predictably */
const display = document.getElementById("display");
const calculator = document.getElementById("calculator");

// Clear display on page load
window.addEventListener('DOMContentLoaded', () => {
    display.value= "";
});

// Event delegation
/*
addEventListener("click", ...) : When someone clicks anywhere inside the calculator, run this function
(event) => {...} : An Arrow function. "Here's what to do when click happens"
The browser passes in an event object that contains information about what was clicked.
*/
calculator.addEventListener("click", (event) => {
    const target = event.target; // event.target refers to the specific button that was clicked

    if(target.tagName === "BUTTON"){ // Is the target's tagName a button?
        const value = target.textContent; // What's the text inside target?
        const action = target.dataset.action;

        if (action === "clear"){
            clearDisplay();
        } else if(value === "="){
            calculate();
        } else {
            appendToDisplay(value);
        }
    }
});

function appendToDisplay(input){
    if(display.value === "Error" || display.value === "undefined" || display.value === "Infinity"){
        clearDisplay();
    }
    display.value += input;

    display.scrollLeft = display.scrollWidth;
}

function clearDisplay(){
    display.value = "";
}

function calculate(){
    try{
        display.value = eval(display.value);
    } catch(error){
        display.value = "Error";
    }
    
}