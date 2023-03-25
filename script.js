
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
let result = NaN; 

let a_string = "";
let b_string = "";

let a_perC = 0;
let b_perC = 0; 


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

        }
        operand_a = parseFloat(a_string);
        operand_b = parseFloat(b_string);
        updateScreen();
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
        if (operBtns[i].className != "equals") { 
            operator = operBtns[i].className;
        }
        else {
            arithmetic[operBtns[i].className];
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
    equals: () => {
        if (operand_a && operand_b) { 
            result = arithmetic[operator](operand_a, operand_b);

            operand_a = result; 
            operand_b = NaN; 
            operator = a_string = b_string = "";
            a_perC = b_perC = 0; 
            
            updateScreen(); 
        }
    },
}


// DOM INTERACTION

function updateScreen() { 
    if (operator) { 
        entry_display.textContent = (!operand_b) ? b_string : operand_b;
    }
    else {
        entry_display.textContent = (!operand_a) ? a_string : operand_a;
    }
    
    result_display.textContent = (!result) ? "" : result; 
}