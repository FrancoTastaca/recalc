const $display = document.querySelector('.display')
const $buttons = document.querySelector('.buttons')

const operations = ['-','*','+','^2'];

let currentDisplay = "";
let operation = null;
let reset = false;

let unused;

$buttons.addEventListener('click', async (e) => {
    const nextAction = e.target.name

    if (nextAction === "=") {
        const [firstArg, secondArg] = currentDisplay.split(operation)

        let result;

        if (operation === "-") {
            result = await calculateSub(firstArg, secondArg)
        }
        else if (operation === '*') {
            result = await calculateMul(firstArg, secondArg);
        }
        else if (operation === '+') {
            result = await calculateAdd(firstArg, secondArg);
        }
        else if (operation === '^2'){
            result = await calculatePow(firstArg)
        }
        reset = true;
        return renderDisplay(result);
    }
    if (operations.includes(nextAction)) {
        operation = nextAction;
    }
    if (nextAction === "c") {
        return renderDisplay('');
    }
    if (reset) {
        reset = false;
        operation = null;
        renderDisplay(nextAction);
    } else {
        renderDisplay(currentDisplay + nextAction);
    }
})

async function calculateSub(firstArg, secondArg) {
    const resp = await fetch(`/api/v1/sub/${firstArg}/${secondArg}`)
    const { result } = await resp.json();
    return result;
}
async function calculateMul(firstArg, secondArg) {
    const resp = await fetch(`/api/v1/mul/${firstArg}/${secondArg}`)
    const { result } = await resp.json()
    return result
}
async function calculateAdd(firstArg, secondArg) {
    const resp = await fetch(`/api/v1/add/${firstArg}/${secondArg}`)
    const { result } = await resp.json()
    return result
}
async function calculatePow(firstArg) {

    if(firstArg > 100000){
        return "Error:n° muy grande, pruebe con otro"
    }
    const resp = await fetch(`/api/v1/pow/${firstArg}`)
    const { result } = await resp.json();
    return result;
}
function renderDisplay(chars) {
    currentDisplay = chars;
    $display.value = chars;
}

function rerender() { }
