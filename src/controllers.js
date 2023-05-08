import express from 'express';
import core from './core.js';

const router = express.Router();

function validacionParametrosNum(req, res, next) {
    const params = req.params;
    const a = Number(params.a);
    const b = Number(params.b);

    if (isNaN(a) || isNaN(b)) {
        throw new Error('Uno de los parámetros no es un número. Por favor, asegurese de que ambos parámetros sean válidos');
    } else {
        req.validParams = { a, b };
        next();
    }
}

router.get("/sub/:a/:b", validacionParametrosNum, async function (req, res) {
    const { a, b } = req.validParams;
    try {
        const result = core.sub(a, b);
        res.send({ result });
    } catch (error) {
        res.status(400).send({ error: 'Uno de los parámetros de la resta no es un número. Por favor, asegurese de que ambos parámetros sean válidos' });
    }
});

router.get("/add/:a/:b", validacionParametrosNum, async function (req, res) {
    const { a, b } = req.validParams;
    try {
        const result = core.add(a, b);
        res.send({ result });
    } catch (error) {
        res.status(400).send({ error: 'Uno de los parámetros de la suma no es un número. Por favor, asegurese de que ambos parámetros sean válidos' });
    }
});

router.get("/div/:a/:b", validacionParametrosNum, async function (req, res) {
    const { a, b } = req.validParams;
    try {
        const result = core.div(a, b);
        res.send({ result });
    } catch (error) {
        res.status(400).send({ error: 'Uno de los parámetros de la división no es un número o el divisor es cero. Por favor, asegurese de que ambos parámetros sean válidos' });
    }
});

router.get("/pow/:a", async function (req, res) {
    const a = Number(req.params.a);
    if (isNaN(a)) {
        res.status(400).send('El parámetro ingresado no es un número. Por favor, asegurese de que sea un parámetro válido para la potencia cuadrada');
    } else {
        const result = core.pow(a);
        res.send({ result });
    }
});

router.get("/mul/:a/:b", validacionParametrosNum, async function (req, res) {
    const { a, b } = req.validParams;
    try {
        const result = core.mul(a, b);
        res.send({ result });
    } catch (error) {
        res.status(400).send({ error:'Uno de los parámetros de la multiplicación no es un número. Por favor, asegurese de que ambos parámetros sean válidos' });
    }
});

export default router;