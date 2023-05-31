import core from '../src/core.js'
import { validacionParametrosNum} from '../src/controllers.js'

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
    
    test('Debería sumar correctamente si ambos parámetros son números', () => {
        const req = {
            params: { a: '2', b: '2' } //Simulamos una peticion de HTTP de los parametros a y b 
        };
        /*jest.fn() es una función proporcionada por Jest que se utiliza para crear una "función ficticia" que se puede usar como sustituto de una función real en las pruebas. En este caso, se crea una función "falsa next() que se pasará como tercer parámetro a validacionParametrosNum. Al llamar a la función next dentro de validacionParametrosNum, se puede comprobar que se ha llamado correctamente con expect(next).toHaveBeenCalled(). */
        const next = jest.fn(); 
        validacionParametrosNum(req, null, next);
        const result = core.add(req.validParams.a, req.validParams.b);
        expect(result).toBe(4); 
        expect(next).toHaveBeenCalled();
    })
    /*test('Debería lanzar un error si alguno de los parámetros no es numérico', () => {
        const req = {
            params: { a: '1', b: 'no es un número' }
        };
        const next = jest.fn();
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        }
        validacionParametrosNum(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
          error:
            'Uno de los parámetros no es un número. Por favor, asegúrese de que ambos parámetros sean válidos',
        });
      }); */
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
        expect(core.div(-5, 2)).toBeLessThan(0);
        expect(core.div(12, -30)).toBeLessThan(0);
        expect(core.div(-24, -12)).toBe(2); 
    })
})

describe('Pow', () => {
    test('Debería 9² = 81', () => {
        expect(core.pow(9)).toBe(81);
        
    })

    test('Debería dar cero toda potencia con base igual a 0', () => {
        expect(core.pow(0)).toBe(0); 
    })

    test('Debería dar uno toda potencia con base igual a 1', () => {
        expect(core.pow(1)).toBe(1); 
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
    expect(core.mul(-2, 1)).toBeLessThan(0);
  })
})

describe('Sub-Opcional', () => {
    test('Debería dar un número negativo una resta con el segundo parámetro mayor al primero', () => {
        expect(core.sub(5, 30)).toBeLessThan(0);
        expect(core.sub(90, 200)).toBeLessThan(0);
        expect(core.sub(-43, -20)).toBeLessThan(0);
        expect(core.sub(-18, 5)).toBeLessThan(0);
    })
})

describe('Mul-Opcional', () => {
    test('Debería multiplicar un número positivo y un número negativo correctamente', () => {
        expect(core.mul(2, -2)).toBeLessThan(0);
        expect(core.mul(-2, 2)).toBeLessThan(0);
      })
    
      test('Debería multiplicar dos números negativos correctamente', () => {
        expect(core.mul(-2, -2)).toBe(4);
      })
})

describe('Pow-Opcional', () => {
    test('Debería dar un número positivo toda potencia con base negativa ', () => {
        expect(core.pow(-55)).toBe(3025);
        expect(core.pow(-24)).toBeGreaterThan(0);
      })
})
describe('Div-Opcional', () => {
    test('Debería devolver un error al dividir por 0', () => {
        expect(core.div(45,0)).toMatch('¡ERROR! No se puede dividir por 0 ');
    })
})
describe('Sqrt-Opcional', () => {
    test('Debería calcular correctamente la raiz cuadrada de 16', () => {
      expect(core.sqrt(16)).toBe(4);
    });
    test('Debería aproximar correctamente la raíz cuadrada de un número decimal', () => {
        expect(core.sqrt(2)).toBeCloseTo(1.414);
      });
})

describe('Ftb-Opcional', () => {
    test('Debería devolver un error al intentar devolver un binario de un número entero', () => {
        expect(core.ftb(45)).toMatch('¡ERROR! El parámetro ingresado no es decimal');
        //Debería ser considerado un número entero 5.00
        expect((core.ftb(5.00))).toMatch('¡ERROR! El parámetro ingresado no es decimal');
    });
    test('Debería convertir en binario un número decimal', () => {
        expect(core.ftb(1.4)).toBeCloseTo(1.011001100110011);
    });
    test('Debería convertir en binario un número decimal negativo', () => {
        expect(core.ftb(-0.16)).toBeCloseTo(-0.001010001111010111);
    });
})


