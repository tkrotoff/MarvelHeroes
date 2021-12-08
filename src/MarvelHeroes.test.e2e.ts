/* eslint-disable jest/no-done-callback, jest/no-standalone-expect, unicorn/numeric-separators-style */

import { expect, test } from '@playwright/test';

// FIXME Generate coverage for JS and CSS
// https://github.com/microsoft/playwright/issues/9208
// https://github.com/microsoft/playwright/issues/7030

const getCharactersApiURL = (offset: number) =>
  `https://gateway.marvel.com/v1/public/characters?ts=*&apikey=*&hash=*&limit=50&offset=${offset}`;

const getCharacterApiURL = (id: number) =>
  `https://gateway.marvel.com/v1/public/characters/${id}?ts=*&apikey=*&hash=*`;

test.beforeEach(async ({ page }) => {
  await Promise.all([
    page.waitForResponse(getCharactersApiURL(0)),
    page.goto('http://localhost:8080')
  ]);

  await expect(page.locator('text="3-D Man"')).toBeVisible();

  const locator = page.locator('section.card');
  await expect(locator).toHaveCount(50);
});

test('page 0, load different heroes', async ({ page }) => {
  await Promise.all([
    page.waitForResponse(getCharacterApiURL(1011334)),
    page.click('text=3-D ManDetails >> a')
  ]);
  await expect(page).toHaveURL('http://localhost:8080/heroes/1011334');
  await expect(page.locator('h1')).toHaveText('3-D Man');

  await Promise.all([
    page.waitForNavigation(),
    page.waitForResponse(getCharactersApiURL(0)),
    page.goBack()
  ]);

  await Promise.all([
    page.waitForResponse(getCharacterApiURL(1017100)),
    page.click('text=A-Bomb (HAS)Details >> a')
  ]);
  await expect(page).toHaveURL('http://localhost:8080/heroes/1017100');
  await expect(page.locator('h1')).toHaveText('A-Bomb (HAS)');

  await Promise.all([
    page.waitForNavigation(),
    page.waitForResponse(getCharactersApiURL(0)),
    page.goBack()
  ]);

  await Promise.all([
    page.waitForResponse(getCharacterApiURL(1009144)),
    page.click('text=A.I.M.Details >> a')
  ]);
  await expect(page).toHaveURL('http://localhost:8080/heroes/1009144');
  await expect(page.locator('h1')).toHaveText('A.I.M.');

  await Promise.all([
    page.waitForNavigation(),
    page.waitForResponse(getCharactersApiURL(0)),
    page.goBack()
  ]);

  // Last card
  await Promise.all([
    page.waitForResponse(getCharacterApiURL(1017574)),
    page.click('text=Angela (Aldrif Odinsdottir)Details >> a')
  ]);
  await expect(page).toHaveURL('http://localhost:8080/heroes/1017574');
  await expect(page.locator('h1')).toHaveText('Angela (Aldrif Odinsdottir)');

  await Promise.all([
    page.waitForNavigation(),
    page.waitForResponse(getCharactersApiURL(0)),
    page.goBack()
  ]);

  await expect(page.locator('text="3-D Man"')).toBeVisible();
});

test('Next and Previous buttons', async ({ page }) => {
  await Promise.all([page.waitForResponse(getCharactersApiURL(50)), page.click('text="Next ›"')]);
  await expect(page).toHaveURL('http://localhost:8080/1');
  await expect(page.locator('text="Anita Blake"')).toBeVisible();

  await Promise.all([page.waitForResponse(getCharactersApiURL(100)), page.click('text="Next ›"')]);
  await expect(page).toHaveURL('http://localhost:8080/2');
  await expect(page.locator('text="Beast"')).toBeVisible();

  await Promise.all([
    page.waitForResponse(getCharactersApiURL(50)),
    page.click('text="‹ Previous"')
  ]);
  await expect(page).toHaveURL('http://localhost:8080/1');
  await expect(page.locator('text="Anita Blake"')).toBeVisible();

  await Promise.all([
    page.waitForResponse(getCharactersApiURL(0)),
    page.click('text="‹ Previous"')
  ]);
  await expect(page).toHaveURL('http://localhost:8080/0');
  await expect(page.locator('text="3-D Man"')).toBeVisible();
});
