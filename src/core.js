function add(a, b) {
    let result = a + b;
    return result;
}

function subtract(a, b) {
}

function multiply(a, b) {
}

function divide(a, b) {
    if (b == 0) {
        console.log('No se puede dividir por 0');
    } else {
        let result = a / b;
        return result;
    }
}

function pow(a, b) {
}

export default {
    add: add,
    sub: subtract,
    mul: multiply,
    div: divide,
    pow: pow
}
