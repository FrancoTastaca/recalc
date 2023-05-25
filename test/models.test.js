const { seed } = require('../src/seed.js')
const {
    createHistoryEntry,
    History,
    Operation,
    getAllHistory
} = require('../src/models.js')

beforeEach(async () => {
    await seed()
})

describe("History", () => {
    test("Deberia poder crear una resta en el history", async () => {
        await createHistoryEntry({
            firstArg: 2,
            secondArg: 2,
            result: 0,
            operationName: "SUB"
        })

        const histories = await History.findAll({
            include: [Operation]
        })

        expect(histories.length).toEqual(1)
        expect(histories[0].firstArg).toEqual(2)
        expect(histories[0].secondArg).toEqual(2)
        expect(histories[0].result).toEqual(0)
        expect(histories[0].Operation.name).toEqual("SUB")
    })
})

describe('getAllHistory', () => {
    test('Deberia obtener todo el historial', async () => {
      // Insertamos algunos registros al historial
      await createHistoryEntry({
        firstArg: 2,
        secondArg: 3,
        result: 5,
        operationName: 'ADD'
      });
      await createHistoryEntry({
        firstArg: 2,
        secondArg: 2,
        result: 0,
        operationName: "SUB"
    })
  
      const history = await getAllHistory()
  
      expect(history.length).toBe(2) // Se comprueba que la cantidad sea correcta
  
      // Verificacion de los valores de la primer y segunda entrada
      expect(history[0].firstArg).toEqual(2)
      expect(history[0].secondArg).toEqual(3)
      expect(history[0].result).toEqual(5)
      expect(history[0].Operation.name).toEqual("ADD")

      expect(history[1].firstArg).toEqual(2)
      expect(history[1].secondArg).toEqual(2)
      expect(history[1].result).toEqual(0)
      expect(history[1].Operation.name).toEqual("SUB")
    });
  
    test('Deberia devolver un array vacio si no hay historial', async () => {
      const history = await getAllHistory()
      expect(history).toEqual([])
    });
  });