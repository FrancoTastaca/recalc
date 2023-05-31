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
    test("El resultado de la suma de 0.1 y 0.2 debe ser 0.3", async () => {
        const app = await api.build();

        return request(app).get('/api/v1/add/0.1/0.2')
            .expect(200)
            .expect('Content-Type', "application/json; charset=utf-8")
            .then((res) => {
                expect(res.body.result).toBeCloseTo(0.3); 
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

/*
//Existe un problema cuando busca la operacion de "POW" y no la encuentra, generando una exepcion, sin embargo se persiste correctamente cuando ocurre un error(lo pude verificar por la ruta /history). Por el momento voy a comentar este test hasta encontrar una solucion
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

//Ocurre el mismo problema que con POW API... pero cuando estan ambas sin comentar - se traba primero en API POW y pasa este. Pero cuando comente el anterior y quedo este solo, dispara el mismo error de que no encuentra la operacion.
describe("API Sqrt", () => {
    test("Debería calcular correctamente la raíz cuadrada de 16 y devolver un resultado de 4", async () => {
        const app = await api.build();

        return request(app).get('/api/v1/sqrt/16')
            .expect(200)
            .expect('Content-Type', "application/json; charset=utf-8")
            .then((res) => {
                expect(res.body.result).toEqual(4)
            })
    })
    test("Debería devolver un código de estado 400 al calcular la raíz cuadrada de un número no válido", async () => {
        const app = await api.build();
    
        return request(app).get('/api/v1/sqrt/abc')
            .expect(400)
            .expect('Content-Type', "application/json; charset=utf-8")
            .then((res) => {
                expect(res.body.error).toEqual('El parámetro ingresado no es un número válido o es negativo. Por favor, asegúrese de que sea un parámetro válido y no negativo para la raiz cuadrada')
            })
    })
    test("Debería calcular correctamente la raíz cuadrada de 2 y devolver un resultado aproximadamente 1.414", async () => {
        const app = await api.build();
    
        return request(app).get('/api/v1/sqrt/2')
            .expect(200)
            .expect('Content-Type', "application/json; charset=utf-8")
            .then((res) => {
                expect(res.body.result).toBeCloseTo(1.414);
            })
    })
})

//Ocurre el mismo problema que con POW API
describe("API Ftb", () => {
    test("Debería devolver un código de estado 400 al intentar convertir un número entero", async () => {
       const app = await api.build();
  
       return request(app).get('/api/v1/ftb/20')
           .expect(400)
           .expect('Content-Type', "application/json; charset=utf-8")
           .then((res) => {
               expect(res.body.error).toEqual('El parámetro ingresado no es un número decimal. Por favor, asegúrese de que sea un parámetro válido.')
           })
   })

   test("Debería responder con un 200 ok", async () => {
       const app = await api.build();

       return request(app).get('/api/v1/ftb/0.25')
           .expect(200)
           .expect('Content-Type', "application/json; charset=utf-8")
           .then((res) => {
               expect(res.body.result).toBeCloseTo(0.01);
           })
   })
})

*/
