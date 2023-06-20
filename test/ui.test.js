import { test, expect } from '@playwright/test';
import { seed } from '../src/seed.js';
import { Operation, History } from '../src/models.js'

test.describe('test', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeEach(async () => {
    await seed();
  })

  test('Deberia tener como titulo de pagina recalc', async ({ page }) => {
    await page.goto('./');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/recalc/i);
  });

  test('Deberia poder realizar una resta', async ({ page }) => {
    await page.goto('./');

    await page.getByRole('button', { name: '7' }).click()
    await page.getByRole('button', { name: '9' }).click()
    await page.getByRole('button', { name: '-' }).click()
    await page.getByRole('button', { name: '9' }).click()

    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/sub/')),
      page.getByRole('button', { name: '=' }).click()
    ]);

    const { result } = await response.json();
    expect(result).toBe(70);

    await expect(page.getByTestId('display')).toHaveValue(/70/)

    const operation = await Operation.findOne({
      where: {
        name: "SUB"
      }
    });

    const historyEntry = await History.findOne({
      where: { OperationId: operation.id }
    })

    expect(historyEntry.firstArg).toEqual(79)
    expect(historyEntry.secondArg).toEqual(9)
    expect(historyEntry.result).toEqual(70)
  });

  test('Deberia poder realizar una multiplicacion', async ({ page }) => {
    await page.goto('./');

    await page.getByRole('button', { name: '2', exact: true }).click()
    await page.getByRole('button', { name: '5' }).click()
    await page.getByRole('button', { name: '*' }).click()
    await page.getByRole('button', { name: '2', exact: true }).click()

    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/mul/')),
      page.getByRole('button', { name: '=' }).click()
    ]);

    const { result } = await response.json();
    expect(result).toBe(50);

    await expect(page.getByTestId('display')).toHaveValue(/50/)

    const operation = await Operation.findOne({
      where: {
        name: "MUL"
      }
    });

    const historyEntry = await History.findOne({
      where: { OperationId: operation.id }
    })

    expect(historyEntry.firstArg).toEqual(25)
    expect(historyEntry.secondArg).toEqual(2)
    expect(historyEntry.result).toEqual(50)
  });

  test('Deberia poder realizar una suma', async ({ page }) => {
    await page.goto('./');


    await page.getByRole('button', { name: '1' }).click()
    await page.getByRole('button', { name: '0' }).click()
    await page.getByRole('button', { name: '+' }).click()
    await page.getByRole('button', { name: '3' }).click()


    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/add/')),
      page.getByRole('button', { name: '=' }).click()
    ]);


    const { result } = await response.json();
    expect(result).toBe(13);


    await expect(page.getByTestId('display')).toHaveValue(/13/)


    const operation = await Operation.findOne({
      where: {
        name: "ADD"
      }
    });


    const historyEntry = await History.findOne({
      where: { OperationId: operation.id }
    })


    expect(historyEntry.firstArg).toEqual(10)
    expect(historyEntry.secondArg).toEqual(3)
    expect(historyEntry.result).toEqual(13)
  });

  test('Deberia poder calcular la potencia cuadrada de un número', async ({page}) => {
    await page.goto('./');


    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '0' }).click();
    await page.getByRole('button', { name: '^2' }).click();

    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/pow/')),
      page.getByRole('button', { name: '=' }).click()
    ]);

    const { result } = await response.json();
    expect(result).toBe(100);

    await expect(page.getByTestId('display')).toHaveValue(/100/)

    const operation = await Operation.findOne({
      where: {
        name: "POW"
      }
    });

    const historyEntry = await History.findOne({
      where: { OperationId: operation.id }
    })

    expect(historyEntry.firstArg).toEqual(10)
    expect(historyEntry.result).toEqual(100)
  });
  test('Deberia verificar que la calculadora tire error si el resultado es mayor que 100.000', async ({page}) => {
    await page.goto('./');


    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '2', exact: true }).click()
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '6' }).click();
    await page.getByRole('button', { name: '7' }).click();
    await page.getByRole('button', { name: '^2' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.getByTestId('display')).toHaveValue(/Error:n° muy grande, pruebe con otro/)
  });
  test('Deberia poder realizar una división', async ({ page }) => {
    await page.goto('./');

    await page.getByRole('button', { name: '1' }).click()
    await page.getByRole('button', { name: '2', exact: true }).click()
    await page.getByRole('button', { name: '/' }).click()
    await page.getByRole('button', { name: '6' }).click()
    await page.getByRole('button', { name: '0' }).click()

    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/div/')),
      page.getByRole('button', { name: '=' }).click()
    ]);

    const { result } = await response.json();
    expect(result).toBe(0.2);

    await expect(page.getByTestId('display')).toHaveValue(/0.2/)

    const operation = await Operation.findOne({
      where: {
        name: "DIV"
      }
    });

    const historyEntry = await History.findOne({
      where: { OperationId: operation.id }
    })

    expect(historyEntry.firstArg).toEqual(12)
    expect(historyEntry.secondArg).toEqual(60)
    expect(historyEntry.result).toEqual(0.2)
  });
  test('Deberia mostrar un mensaje de error en el display si el divisor es 0', async ({ page }) => {
    await page.goto('./');

    await page.getByRole('button', { name: '2', exact: true }).click()
    await page.getByRole('button', { name: '8' }).click()
    await page.getByRole('button', { name: '/' }).click()
    await page.getByRole('button', { name: '0' }).click()
    await page.getByRole('button', { name: '=' }).click()
    await expect(page.getByTestId('display')).toHaveValue(/¡Error! No se puede dividir por 0/);
  });
  test('Deberia limpiar el display al precionar el boton C', async ({ page }) => {
    await page.goto('./'); 
    await page.getByRole('button', { name: '5' }).click()
    await page.getByRole('button', { name: '*' }).click() 
    await page.getByRole('button', { name: '^2' }).click()
    await page.getByRole('button', { name: 'c'}).click(); 
    await expect(page.getByTestId('display')).toHaveValue('') 
  })
  test('No deberia hacer nada al hacer clic en un lugar vacio', async ({ page }) => {
    await page.goto('./');
  
    await page.getByRole('button', { name: '7' }).click();
    await page.getByRole('button', { name: '-' }).click();
    await page.evaluate(() => {
      const emptyArea = document.querySelector('.empty-area'); // Reemplaza '.empty-area' con el selector adecuado para el área vacía
      if (emptyArea) {
        emptyArea.click();
      }
    });
    await expect(page.getByTestId('display')).toHaveValue('7-');
  });

  






































  test('Deberia poder convertir decimal a binario', async ({page}) => {
    await page.goto('./');


    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: 'dtb' }).click();

    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes('/api/v1/dtb/')),
      page.getByRole('button', { name: '=' }).click()
    ]);

    const { result } = await response.json();
    expect(result).toBe(101);

    await expect(page.getByTestId('display')).toHaveValue(/101/)

    const operation = await Operation.findOne({
      where: {
        name: "DTB"
      }
    });

    const historyEntry = await History.findOne({
      where: { OperationId: operation.id }
    })

    expect(historyEntry.firstArg).toEqual(5)
    expect(historyEntry.result).toEqual(101)
  });  
})