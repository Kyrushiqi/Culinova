'use strict';

window.onload = function () {
    const display = document.getElementById("display");
    const buttonsDiv = document.getElementById("buttons");

    let currentInput = "";

    buttonsDiv.addEventListener("click", function (e) {
        const btn = e.target;

        if (btn.tagName !== "BUTTON") return;

        const value = btn.textContent;

        if (value === "C") {
            currentInput = "";
            display.value = "";
        } else if (value === "=") {
            try {
                display.value = eval(currentInput);
                currentInput = display.value;
            } catch {
                display.value = "Error";
                currentInput = "";
            }
        } else {
            currentInput += value;
            display.value = currentInput;
        }
    });
};
