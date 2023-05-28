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

describe("API Div", () => {
    test("Si el segundo parámetro es 0, el thenpoint debe devolver un mensaje de error junto a un status 200", async () => {
        const app = await api.build();
        return request(app).get('/api/v1/div/8/0')
            .expect(400)
            .expect('Content-Type', "application/json; charset=utf-8")
            .then((res) => {
                expect(res.body.error).toEqual('¡ERROR! No se puede dividir por 0 ') 
            })
    });
});

