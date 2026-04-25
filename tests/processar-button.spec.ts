import { expect, test } from '@playwright/test';

test('botao Processar aparece e confirma o processamento', async ({ page }) => {
  await page.route('**/api-tesouro/**', async (route) => {
    await route.fulfill({
      contentType: 'application/json',
      json: {
        response: {
          TrsrBdTradgList: [
            {
              TrsrBd: {
                nm: 'Tesouro Selic 2029',
                mtrtyDt: '2029-03-01',
                untrRedVal: '15.000,00',
                anulRedRate: '0,1234',
              },
            },
          ],
        },
      },
    });
  });

  await page.goto('/');

  const processButton = page.getByRole('button', { name: 'Processar' });
  await expect(processButton).toBeVisible();
  await expect(processButton).toHaveCSS('background-color', 'rgb(220, 38, 38)');

  await processButton.click();
  await expect(page.getByRole('status')).toHaveText('Processamento realizado com sucesso.');
  await page.screenshot({ path: 'test-evidence/processar-button.png', fullPage: true });
});
