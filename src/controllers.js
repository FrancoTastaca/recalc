import express from 'express';
import core from './core.js';

import { createHistoryEntry,getAllHistory,deleteAllHistory,historyById } from './models.js'

const router = express.Router();

function guardarValoresConError(req, error) {

    let operationName = ''
    const routePath = req.route.path; 
    //req.route.path contiene la ruta completa,
    // Con el startWith podemos hacer foco en como inicia la ruta y nos desligamos de la dependencia de los valores de entrada, ya que sabemos que no son numeros
    if (routePath.startsWith('/sub')) {
      operationName = 'SUB'
    } else if (routePath.startsWith('/add')) {
      operationName = 'ADD'
    } else if (routePath.startsWith('/div')) {
      operationName = 'DIV'
    } else if (routePath.startsWith('/mul')) {
      operationName = 'MUL'
    }
    createHistoryEntry({ firstArg: null, secondArg: null, operationName, error: error.message })
  }
function validacionParametrosNum(req, res, next) {
    try {
        const params = req.params;
        const a = Number(params.a);
        const b = Number(params.b);
        if (isNaN(a) || isNaN(b)) {
            throw new Error('Uno de los parámetros no es un número. Por favor, asegúrese de que ambos parámetros sean válidos');
        }
        req.validParams = { a, b };
        next();
    } catch (error) {
      guardarValoresConError(req, error);
      res.status(400).json({ error: error.message });
    }
}

router.get("/sub/:a/:b", validacionParametrosNum, async function (req, res) {
    const { a, b } = req.validParams;
    const result = core.sub(a, b);
    await createHistoryEntry({ firstArg: a, secondArg: b, operationName: "SUB", result})
    res.send({ result });
});

router.get("/add/:a/:b", validacionParametrosNum, async function (req, res) {
        const { a, b } = req.validParams;
        const result = core.add(a, b);
        await createHistoryEntry({ firstArg: a, secondArg: b, operationName: "ADD", result})
        res.send({ result });
});

router.get("/div/:a/:b", validacionParametrosNum, async function (req, res) {
    const { a, b } = req.validParams;
    if ( b === 0) {
        const errorMsg = '¡ERROR! No se puede dividir por 0 '
        res.status(400).send({ error: errorMsg})
        await createHistoryEntry({ firstArg: a, secondArg: b, operationName: "DIV", error: errorMsg})
    }else{
        const result = core.div(a, b);
        await createHistoryEntry({ firstArg: a, secondArg: b, operationName: "DIV", result,})
        res.send({ result });
    }
});

router.get("/pow/:a", async function (req, res) {
    const a = Number(req.params.a);
    if (isNaN(a)) {
        const errorMsg ='El parámetro ingresado no es un número. Por favor, asegúrese de que sea un parámetro válido para la potencia cuadrada'
        res.status(400).send({ error: errorMsg})
        await createHistoryEntry({ firstArg: null, operationName: "POW" , error:errorMsg })

    } else {
        const result = core.pow(a);
        await createHistoryEntry({ firstArg: a, operationName: "POW", result});
        res.send({ result });
    }
});

router.get("/mul/:a/:b", validacionParametrosNum, async function (req, res) {
    const { a, b } = req.validParams;
    const result = core.mul(a, b);
    await createHistoryEntry({ firstArg: a, secondArg: b, operationName: "MUL", result});
    res.send({ result });
});

router.get("/sqrt/:a", async function (req, res) {
    const a = Number(req.params.a);
    if (isNaN(a)|| a < 0) {
        const errorMsg = 'El parámetro ingresado no es un número válido o es negativo. Por favor, asegúrese de que sea un parámetro válido y no negativo para la raiz cuadrada'
        await createHistoryEntry({ firstArg: null, operationName: "SQRT", error: errorMsg});
        res.status(400).send({ error:errorMsg});
    } else {
        const result = core.sqrt(a);
        await createHistoryEntry({ firstArg: a, operationName: "SQRT", result});
        res.send({ result });
    }
});

router.get("/dtb/:a", async function (req, res) {
    const a = Number(req.params.a);
    if (isNaN(a)) {
        const errorMsg = 'El parámetro ingresado no es un número. Por favor, asegúrese de que sea un parámetro válido.'
        await createHistoryEntry({ firstArg: null, operationName: "DTB", error: errorMsg});
        res.status(400).send({ error:errorMsg});
    } else {
        const result = core.dtb(a);
        await createHistoryEntry({ firstArg: a, operationName: "DTB", result});
        res.send({ result });
    }
});

router.get("/historyById/:id", async function (req, res) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        res.status(400).send({error: 'El parámetro ingresado no es un número. Por favor, asegúrese de que sea un parámetro válido.'})
    }else{
        const result = await historyById(id);
        res.send({ result });
    }
});

router.get("/history", async function (req, res) {
    const history = await getAllHistory()
    // Mapeamos los datos para formatear y estructurar mejor la legibilidad de los datos
    const formattedHistory = history.map(({ id, Operation, firstArg, secondArg, result, error}) => ({
      id,
      operation: Operation.name,
      arguments: {
        first: firstArg,
        second: secondArg
      },
      result,
      error,
    }))
    //Generamos una respuesta en HTML que muestra la cadena JSON preformateada dentro de la etiqueta <pre>. Al hacerlo, logramos una visualización más legible y de facil lectura
    res.send(`
     <pre>${JSON.stringify({ history: formattedHistory}, null, 2)}</pre> 
    `)
    
});

// Queda pendiente buscar la forma de que la ruta "/deleteHistory" utilice el método DELETE en lugar de GET, ya que es lo más apropiado para responder a una solicitud de eliminación del historial. Sin embargo, por el momento, se mantiene la ruta de esta forma para poder utilizar esta funcionalidad.

router.get("/deleteHistory",async function(req,res){
    await deleteAllHistory()
    res.status(200).send({ message: "Historial eliminado con exito" })
     
});

export { validacionParametrosNum };
export default router;