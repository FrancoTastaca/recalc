import express from 'express';
import core from './core.js';

import { createHistoryEntry } from './models.js'

const router = express.Router();

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
        res.status(400).json({ error: error.message });
    }
}


router.get("/sub/:a/:b", validacionParametrosNum, async function (req, res) {
    const { a, b } = req.validParams;
    const result = core.sub(a, b);
    await createHistoryEntry({ firstArg: a, operationName: "ADD" })
    res.send({ result });
});

router.get("/add/:a/:b", validacionParametrosNum, async function (req, res) {
        const { a, b } = req.validParams;
        const result = core.add(a, b);
        res.send({ result });
});

router.get("/div/:a/:b", validacionParametrosNum, async function (req, res) {
    const { a, b } = req.validParams;
    const result = core.div(a, b);
    res.send({ result });
   
});

router.get("/pow/:a", async function (req, res) {
    const a = Number(req.params.a);
    if (isNaN(a)) {
        res.status(400).send({ error:'El parámetro ingresado no es un número. Por favor, asegurese de que sea un parámetro válido para la potencia cuadrada'});
    } else {
        const result = core.pow(a);
        res.send({ result });
    }
});

router.get("/mul/:a/:b", validacionParametrosNum, async function (req, res) {
    const { a, b } = req.validParams;
    const result = core.mul(a, b);
    res.send({ result });
});

export { validacionParametrosNum };
export default router;