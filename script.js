
// PLANNING 
/* 
    make the simple arithmetic functions 
        add
        subtract 
        divide 
        multiply

    create dom variables that hold input from calculator 

*/

// DOM ELEMENTS 

let operand_a; 
let operand_b; 
let operator; 
let result; 


// ARITHMETIC 
function operate(operand, operator_1, operator_2) {
    return arithmetic[operand](operator_1, operator_2);
}


const arithmetic = { 
    sum: (a,b) => a + b,
    subtract: (a,b) => a - b,

    multiply: (a,b) => a * b,
    divie: (a,b) => a / b,

    pow:  (a,b) => a ** b,
}
