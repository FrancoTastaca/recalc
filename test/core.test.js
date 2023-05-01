import core from '../src/core.js'

describe('Subtract', () => {
    test('Deberia 2 - 2 = 0', () => {
        expect(core.sub(2, 2)).toBe(0); 
    })

    test('Deberia 6 - 4 = 2', () => {
        expect(core.sub(6, 4)).toBe(2); 
    })
})

describe('Add', () => {
    test('Deberia 240 + 16 = 256', () => {
        expect(core.add(240, 16)).toBe(256); 
    })

    test('Deberia -36 + 55 = 19', () => {
        expect(core.add(-36, 55)).toBe(19); 
    })
})

describe('Mul', () => {
    test('debería multiplicar un número positivo y un número negativo correctamente', () => {
        expect(core.mul(2, -2)).toBe(-4);
        expect(core.mul(-2,2)).toBe(-4);
      });
    
      test('debería multiplicar dos números negativos correctamente', () => {
        expect(core.mul(-2, -2)).toBe(4);
      });
})