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

describe("API add", () => {
    test("El segundo parámetro es negativo, por lo que el resultado debe ser menor al primer parametro por ser una suma y el endpoint debe devolver un status 200", async () => {
        const app = await api.build();

        request(app).get('/api/v1/add/10/-5')
            .expect(200)
            .expect('Content-Type', "application/json; charset=utf-8")
            .end((err, res) => {
                if (err) throw err;

                expect(res.body.result).toBeLessThan(10); 
            })
    });
});

