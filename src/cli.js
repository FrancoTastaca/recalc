import { createInterface } from "node:readline/promises";
import core from "./core.js"

const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const AVAILABLE_FNS = [...Object.keys(core), 'exit'].join(', ')

async function loop() {
    const fnName = await readline.question(`Ingrese función (${AVAILABLE_FNS}): `)
    const fn=core[fnName];

    if (fnName === "exit") {
        console.log("👋👋👋");
        return readline.close();
    }
    if (!fn) {
        console.log(`La función "${fnName}" es incorrecta, por favor vuelva intentar`);
        return loop();
    }
    /*La función const fn = core[fnName]; toma el valor de core[fnName], es decir, toma el valor de la propiedad con nombre igual al valor de la variable fnName dentro del objeto core. Si fnName es 'add', fn tomará el valor de la función add dentro de core.
    Luego, el if (!fn) verifica si fn es falso, lo que sucederá si core[fnName] no existe o es undefined. Si es así, se imprimirá un mensaje de error en la consola con el nombre de la función incorrecta, y se llamará a la función loop() para volver a pedir al usuario que ingrese una función válida. */ 

    else if (fnName == "pow"){
            const powNum = await readline.question("Ingrese el número a elevar al cuadrado: ");
             //Se trata el bug de solicitar mas parametros de los necesarios para el pow cuadrado
            console.log(`El resultado del cuadrado es: ${core.pow(Number(powNum))}`);  
        }
    else {
        const firstNum = await readline.question("Ingrese el primer número: ")
        const secondNum = await readline.question("Ingrese el segundo número: ")
        switch(fnName) {
            case "add":
                console.log(`El resultado de la suma es: ${core.add(Number(firstNum), Number(secondNum))}`);
                break;
            case "sub":
                console.log(`El resultado de la resta es: ${core.sub(Number(firstNum), Number(secondNum))}`);
                break;
            case "mul":
                console.log(`El resultado de la multiplicacion es: ${core.mul(Number(firstNum), Number(secondNum))}`);
                break;    
            case "div":
            console.log(`El resultado de la division es: ${core.div(Number(firstNum), Number(secondNum))}`);

        }
    }
    loop();
    }
    
loop();