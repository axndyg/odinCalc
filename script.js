
// PLANNING 
/* 
    make the simple arithmetic functions 
        add
        subtract 
        divide 
        multiply

    create dom variables that hold both operands
    the operator 
    the result 

    update all button event listeners and act on their class 

    have a function that to update display;  
*/

// main Nunbers 
let operand_a = NaN; 
let operand_b = NaN; 
let operator = ""; 
let sign = "";
let result = NaN; 

let a_string = "";
let b_string = "";

let a_perC = 0;
let b_perC = 0; 

let in_ERR = false;


// DOM ELEMENTS 

const entry_display = document.querySelector('.entry');
const result_display = document.querySelector('.result');

const numBtns = document.querySelectorAll("#num");
for (let i = 0; i < numBtns.length; i++) { 
    numBtns[i].addEventListener("click", (e) => {
        if (operator == "") { 
            if (numBtns[i].textContent == '.' ) {
               if (a_perC < 1) { 
                    a_perC++;
                    a_string += "" + numBtns[i].textContent;
                }
            }
            else {
                a_string += "" + numBtns[i].textContent;
            }
            operand_a = parseFloat(a_string);
            updateScreen();
        }
        else if (operator != "equals") {
            if (numBtns[i].textContent == '.' ) {
                if (b_perC < 1) {
                    b_perC++;
                    b_string += "" + numBtns[i].textContent;
                }
             }
             else {
                 b_string += "" + numBtns[i].textContent;
             }
             operand_b = parseFloat(b_string);
             updateScreen();
        }
        
        
        
    });
}

const funcBtns = document.querySelectorAll('#func'); 
for (let i = 0; i < funcBtns.length; i++) { 
    funcBtns[i].addEventListener("click", () => {
        funcs[funcBtns[i].className]();
    })
}

const operBtns = document.querySelectorAll('#operand');
for (let i = 0; i < operBtns.length; i++) { 
    operBtns[i].addEventListener("click", () => {
            if (operBtns[i].className == "equals") { 
                if (operand_a  && operand_b != NaN) { 
                    result = arithmetic[operator](operand_a, operand_b); 

                    operand_a = result; 
                    a_string = operand_a.toString();
                    operand_b = NaN; 
                    b_string = "";
                    b_perC = 0; 
                        
                }
                else if (operand_a) { 
                    result = operand_a;
                } 
                operator = "";
                updateScreen();
            }
            else { 
                operator = operBtns[i].className;
                sign = operBtns[i].textContent;
            }
    })
}

// BTN Functions 
const funcs = { 
    clear: function() { 
        operand_a = operand_b = result = NaN;
        operator = a_string = b_string = ""; 
        a_perC = b_perC = 0; 
        updateScreen();
    }, 
    del: function() { 
        if (operator == "") {
            a_string = a_string.substring(0, a_string.length - 1);
            operand_a = parseFloat(a_string);
        }
        else if (operator != "equals") {
            b_string = b_string.substring(0, b_string.length - 2);
            operand_b = parseFloat(b_string);
        }
        updateScreen();
    },

}

// ARITHMETIC 

const arithmetic = { 
    sum: (a,b) => a + b,
    subtract: (a,b) => a - b,

    multiply: (a,b) => a * b,
    divide: (a,b) => (b != 0) ? a / b : "DIVIE BY ZERO ERROR",

    pow:  (a,b) => a ** b,
}


// DOM INTERACTION

function updateScreen() { 
    if (!result)  {
          entry_display.textContent = ((operator) ? b_string : a_string);
    }
    else {
        entry_display.textContent = "";
    }
    result_display.textContent = (!result) ? "" : result; 
    result = NaN;
}