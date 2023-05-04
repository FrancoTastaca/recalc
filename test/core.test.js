import core from '../src/core.js'

describe('Subtract', () => {
    test('Debería 2 - 2 = 0', () => {
        expect(core.sub(2, 2)).toBe(0); 
    })

    test('Debería 6 - 4 = 2', () => {
        expect(core.sub(6, 4)).toBe(2); 
    })
})

describe('Add', () => {
    test('Debería 240 + 16 = 256', () => {
        expect(core.add(240, 16)).toBe(256); 
    })

    test('Debería -36 + 55 = 19', () => {
        expect(core.add(-36, 55)).toBe(19); 
    })
})

describe('Divide', () => {
    test('Debería hacer una división exacta 21 / 3  = 7', () => {
        expect(core.div(21, 3)).toBe(7);
        expect(core.mul(3, 7)).toBe(21);
        expect(21 % 3).toBe(0); 
    })

    test('Debería hacer una división inexacta 67 / 8  = 8.375', () => {
        expect(core.div(67, 8)).toBe(8.375);
        //Comprobación con decimal
        expect(core.mul(8.375, 8)).toBe(67);
        //Para la siguiente comprobación se tuvo en cuenta el número entero, no el decimal
        expect(core.add((core.mul(8, 8)), (67 % 8))).toBe(67);
        expect(67 % 8).not.toBe(0);
        expect(67 % 8).toBeLessThan(8); 
    })
    
    test('Debería hacer una división con divisor mayor al dividendo 6 / 24  = 0.25', () => {
        expect(core.div(6, 24)).toBe(0.25); 
    })

    test('Debería dividir con números negativos', () => {
        expect(core.div(-5, 2)).toBe(-2.5);
        expect(core.div(12, -30)).toBe(-0.4);
        expect(core.div(-24, -12)).toBe(2); 
    })
})

describe('Multiply', () => {
  test('Debería multiplicar dos números positivos correctamente', () => {
    expect(core.mul(2, 2)).toBe(4);
  })

  // Tratamos algunas de las propiedades de multiplicacion 
  test('Debería cumplir con la propiedad conmutativa de la multiplicación', () => {
    expect(core.mul(2, 3)).toBe(core.mul(3, 2));
  })

  test('Debería cumplir con la propiedad de identidad de la multiplicación', () => {
    expect(core.mul(4, 1)).toBe(4);
    expect(core.mul(0, 1)).toBe(0);
    expect(core.mul(-2, 1)).toBe(-2);
  })
})

describe('Mul', () => {
    test('Debería multiplicar un número positivo y un número negativo correctamente', () => {
        expect(core.mul(2, -2)).toBe(-4);
        expect(core.mul(-2, 2)).toBe(-4);
      })
    
      test('Debería multiplicar dos números negativos correctamente', () => {
        expect(core.mul(-2, -2)).toBe(4);
      })
})
