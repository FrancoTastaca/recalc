const request = require('supertest');
const api = require('../src/api.js');
const { seed } = require('../src/seed.js')

beforeEach(async () => {
    await seed()
})

describe("API substract", () => {
    test("Deberia responder con un 200 ok", async () => {
        const app = await api.build()

        return request(app).get('/api/v1/sub/2/1')
            .expect(200)
            .expect('Content-Type', "application/json; charset=utf-8")
            .then((res) => {
                expect(res.body.result).toEqual(1);
            })
    })
})

describe("API add", () => {
    test("El segundo parámetro es negativo, por lo que el resultado debe ser menor al primer parametro por ser una suma y el endpoint debe devolver un status 200", async () => {
        const app = await api.build();

        return request(app).get('/api/v1/add/10/-5')
            .expect(200)
            .expect('Content-Type', "application/json; charset=utf-8")
            .then((res) => {
                expect(res.body.result).toBeLessThan(10); 
            })
    });
});

describe("API Mul", () => {
    test("Ambos parametros son decimales, por lo que el resultado debe ser con decimales y el thenpoint debe devolver un status 200", async () => {
        const app = await api.build();
        return request(app).get('/api/v1/mul/2.124/4.757')
            .expect(200)
            .expect('Content-Type', "application/json; charset=utf-8")
            .then((res) => {
                expect(Number.isInteger(res.body.result)).toBe(false) 

            })
    });
});













describe("API Pow", () => {
    test("Si el parámetro no es un número, el thenpoint debe devolver un error junto a un status 400", async () => {
        const app = await api.build();
        return request(app).get('/api/v1/pow/t')
            .expect(400)
            .expect('Content-Type', "application/json; charset=utf-8")
            .then((res) => {
                expect(res.body.error).toEqual('El parámetro ingresado no es un número. Por favor, asegúrese de que sea un parámetro válido para la potencia cuadrada') 
            })
    });
});