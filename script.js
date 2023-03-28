
// PLANNING 
/* 

    NEED TO ADD RECURSIVE continous operations if a 2nd operator is chosen after the 2nd number is in 
        best way to do this is only update the result on equals, it should already do that 

        when we have a operand_b and operator is being selected again, 
        we should perform the arithmetic from the prior operator, store the result in operand a 
        and proceed like normal 

    also later need to add keyboard interaction 

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
let nxt_NUM = false;
let equal_hit = false;


// DOM ELEMENTS 

const entry_display = document.querySelector('.entry');
const result_display = document.querySelector('.result');

const allBtns = document.getElementsByTagName('button'); 
for (let i = 0; i < allBtns.length; i++) {
    allBtns[i].addEventListener("click", () => {
            if (in_ERR) funcs.clear();
            in_ERR = false;
            if (result_display.textContent) result_display.textContent = "";
        }
    );
}

const numBtns = document.querySelectorAll("#num");
for (let i = 0; i < numBtns.length; i++) { 
    numBtns[i].addEventListener("click", (e) => {
        if (equal_hit) {
           funcs.clear();
        }
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
            nxt_NUM = true;
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
            if (equal_hit) equal_hit = false;
            if (operBtns[i].className == "equals") { 
                
                if (!isNaN(operand_a)  && !isNaN(operand_b) && operator) { 
                    
                    result = arithmetic[operator](operand_a, operand_b); 

                    operand_a = result; 
                    a_string = operand_a.toString();
                    operand_b = NaN; 
                    b_string = sign = operator = "";
                    b_perC = 0; 
                    nxt_NUM = in_ERR = false;
                        
                }
                else if (!isNaN(operand_a)) { 
                    result = operand_a;
                    operator = sign = "" ;
                } 
                equal_hit = true;
            }
            else if (!isNaN(operand_b)) {
                operand_a = arithmetic[operator](operand_a, operand_b);
                a_string = operand_a.toString();

                operand_b = NaN;
                b_string = sign = operator = "";
                b_perC = 0; 
                nxt_NUM = in_ERR = false;  
                
                operator = operBtns[i].className;
                sign = operBtns[i].textContent;
                if (sign == "nx") sign = "pow";

            }
            else if (!isNaN(operand_a)) { 
                operator = operBtns[i].className;
                sign = operBtns[i].textContent;
                if (sign == "nx") sign = "pow";
            }
            updateScreen();
    })
}

// BTN Functions 
const funcs = { 
    clear: function() { 
        operand_a = operand_b = result = NaN;
        operator = a_string = b_string = sign = ""; 
        a_perC = b_perC = 0; 
        in_ERR = nxt_NUM = equal_hit = false;
        entry_display.textContent = result_display.textContent = "";
    }, 
    del: function() { 
        if (sign) { 
            operator = sign = "";
        }
        else if (operand_a == "Infinity") {
            funcs.clear();
        }
        else if (operator == "") {
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
    divide: function(a,b) {

     if (b != 0) return a / b;
     in_ERR = true;
     return "DIVIDE BY ZERO ERROR";
    },
    pow:  (a,b) => a ** b,
}


// DOM INTERACTION

function updateScreen() { 
 
    if (!isNaN(result)) {
        entry_display.textContent = "";
        result_display.textContent = result;
        result = NaN;
    }
    else {
        if (nxt_NUM) {
            entry_display.textContent = b_string;
        }
        else  {
            entry_display.textContent = a_string;
            if (sign) {
                entry_display.textContent = a_string + " " + sign;
            }
        }
    }
}
