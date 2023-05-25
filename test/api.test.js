const request = require('supertest');
const api = require('../src/api.js');
const { seed } = require('../src/seed.js')

beforeEach(async () => {
    await seed()
})

describe("API substract", () => {
    test("Deberia responder con un 200 ok", async () => {
        const app = await api.build()

        request(app).get('/api/v1/sub/2/1')
            .expect(200)
            .expect('Content-Type', "application/json; charset=utf-8")
            .end((err, res) => {
                if (err) throw err

                expect(res.body.result).toEqual(1);
            })
    })
})

describe("API Mul", () => {
    test("Ambos parametros son decimales, por lo que el resultado debe ser con decimales y el endpoint debe devolver un status 200", async () => {
        const app = await api.build();

        request(app).get('/api/v1/mul/2.124/4.757')
            .expect(200)
            .expect('Content-Type', "application/json; charset=utf-8")
            .end((err, res) => {
                if (err) throw err;

                expect(Number.isInteger(res.body.result)).toBe(false) 
            })
    });
});