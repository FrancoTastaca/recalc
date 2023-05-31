function add(a, b) {
    let result = a + b;
    return result;
}

function subtract(a, b) {
    let result = a - b;
    return result;
}

function multiply(a, b) {
    let result = a * b;
    return result;
}

function divide(a, b) {
    let result = (b != 0) ? (a/b) : "¡ERROR! No se puede dividir por 0 "; //Otra forma mas 
    // La logica de sintaxis es la siguiente: "condicion ? valorSiVerdadero : valorSiFalso;" 
    return result;
}

function pow(a) { 
    let result= Math.pow(a,2);
    return result;
}
function sqrt(a) {
    let result= Math.sqrt(a); 
    return result;
}

export default {
    add: add,
    sub: subtract,
    mul: multiply,
    div: divide,
    pow: pow,
    sqrt:sqrt
}
