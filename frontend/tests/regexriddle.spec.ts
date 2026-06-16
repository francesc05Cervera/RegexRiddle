import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:4200/#';
const EMAIL = 'test@test.it';
const PASSWORD = 'test1';

// Helper: fa login e restituisce la pagina autenticata
async function login(page: any) {
  await page.goto(`${BASE}/login`);
  await page.getByLabel(/email/i).fill(EMAIL);
  await page.getByLabel(/password/i).fill(PASSWORD);
  await page.getByRole('button', { name: /login|accedi/i }).click();
  await page.waitForURL(`${BASE}/challenges`);
}

// 1. Home carica correttamente
test('1 - Home page visibile', async ({ page }) => {
  await page.goto(`${BASE}/`);
  await expect(page).toHaveURL(`${BASE}/`);
  await expect(page.locator('body')).toBeVisible();
});

// 2. Come si gioca visibile senza login
test('2 - Come si gioca visibile senza autenticazione', async ({ page }) => {
  await page.goto(`${BASE}/come-si-gioca`);
  await expect(page).toHaveURL(`${BASE}/come-si-gioca`);
  await expect(page.locator('body')).toBeVisible();
});

// 3. Redirect a /login se non autenticato
test('3 - Redirect a login se si accede a /challenges senza autenticazione', async ({ page }) => {
  await page.goto(`${BASE}/challenges`);
  await expect(page).toHaveURL(`${BASE}/login`);
});

// 4. Pagina login visibile
test('4 - Pagina login visibile', async ({ page }) => {
  await page.goto(`${BASE}/login`);
  await expect(page).toHaveURL(`${BASE}/login`);
  await expect(page.getByRole('button', { name: /login|accedi/i })).toBeVisible();
});

// 5. Login con credenziali errate mostra errore
test('5 - Login con credenziali errate mostra errore', async ({ page }) => {
  await page.goto(`${BASE}/login`);
  await page.getByLabel(/email/i).fill('wrong@wrong.com');
  await page.getByLabel(/password/i).fill('wrongpassword');
  await page.getByRole('button', { name: /login|accedi/i }).click();
  await expect(page.locator('body')).toContainText(/error|errore|invalid|credenziali|incorrect/i);
});

// 6. Login con credenziali corrette → redirect a /challenges
test('6 - Login con credenziali corrette redirect a challenges', async ({ page }) => {
  await page.goto(`${BASE}/login`);
  await page.getByLabel(/email/i).fill(EMAIL);
  await page.getByLabel(/password/i).fill(PASSWORD);
  await page.getByRole('button', { name: /login|accedi/i }).click();
  await expect(page).toHaveURL(`${BASE}/challenges`);
});

// 7. Pagina register visibile
test('7 - Pagina register visibile', async ({ page }) => {
  await page.goto(`${BASE}/register`);
  await expect(page).toHaveURL(`${BASE}/register`);
  await expect(page.getByRole('button', { name: /register|registrati/i })).toBeVisible();
});

// 8. Lista challenges visibile dopo login
test('8 - Lista challenges visibile dopo login', async ({ page }) => {
  await login(page);
  await expect(page).toHaveURL(`${BASE}/challenges`);
  await expect(page.locator('body')).toBeVisible();
});

// 9. Pagina create-challenge visibile dopo login
test('9 - Pagina create-challenge visibile dopo login', async ({ page }) => {
  await login(page);
  await page.goto(`${BASE}/create-challenge`);
  await expect(page).toHaveURL(`${BASE}/create-challenge`);
  await expect(page.locator('body')).toBeVisible();
});

// 10. Leaderboard visibile dopo login
test('10 - Leaderboard visibile dopo login', async ({ page }) => {
  await login(page);
  await page.goto(`${BASE}/leaderboard`);
  await expect(page).toHaveURL(`${BASE}/leaderboard`);
  await expect(page.locator('body')).toBeVisible();
});