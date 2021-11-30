import { CoverageEntry } from 'puppeteer';

jest.setTimeout(20_000); // 20s

beforeAll(async () => {
  await Promise.all([page.coverage.startJSCoverage(), page.coverage.startCSSCoverage()]);
});

beforeEach(async () => {
  await page.goto('http://localhost:8080');
});

function computeCoverage(entries: CoverageEntry[]) {
  let totalBytes = 1; // Cannot be 0 otherwise usedBytes / totalBytes gives a NaN
  let usedBytes = 0;
  entries.forEach(entry => {
    totalBytes += entry.text.length;
    entry.ranges.forEach(range => {
      usedBytes += range.end - range.start - 1;
    });
  });
  totalBytes /= 1024;
  usedBytes /= 1024;
  return `${Math.round((usedBytes / totalBytes) * 100)}% (${Math.round(usedBytes)}/${Math.round(
    totalBytes
  )} KiB)`;
}

afterAll(async () => {
  const [jsCoverage, cssCoverage] = await Promise.all([
    page.coverage.stopJSCoverage(),
    page.coverage.stopCSSCoverage()
  ]);

  console.log(`JavaScript coverage: ${computeCoverage(jsCoverage)}`);
  console.log(`CSS coverage: ${computeCoverage(cssCoverage)}`);
});

test('Navigation', async () => {
  {
    await page.waitForSelector('section.card > div.card-body > h5.card-title');

    const heroes = await page.$$('section.card');
    expect(heroes).toHaveLength(50);

    const firstHeroCard = heroes[0];
    expect(await firstHeroCard.$('h5.card-title')).toMatch('3-D Man');

    const link = (await firstHeroCard.$('div.card-footer > a'))!;
    await link.click();
    // [waitForNavigation doesn't work after clicking a link](https://github.com/GoogleChrome/puppeteer/issues/1412)
    //await page.waitForNavigation();
    await page.waitForSelector('section.hero');

    const hero = (await page.$('section.hero'))!;
    expect(await hero.$eval('p', node => node.textContent)).toEqual(''); // No description
    expect(await hero.$('p')).toMatch(''); // No description
    expect(await hero.$eval('h1', node => node.textContent)).toEqual('3-D Man');
    expect(await hero.$('h1')).toMatch('3-D Man');
  }

  await page.goBack();

  {
    await page.waitForSelector('section.card > div.card-body > h5.card-title');

    const heroes = await page.$$('section.card');
    expect(heroes).toHaveLength(50);

    const thirdHeroCard = heroes[2];
    expect(await thirdHeroCard.$eval('h5.card-title', node => node.textContent)).toEqual('A.I.M.');
    await expect(await thirdHeroCard.$('h5.card-title')).toMatch('A.I.M.');

    const link = (await thirdHeroCard.$('div.card-footer > a'))!;
    await link.click();
    // [waitForNavigation doesn't work after clicking a link](https://github.com/GoogleChrome/puppeteer/issues/1412)
    //await page.waitForNavigation();
    await page.waitForSelector('section.hero');

    const hero = (await page.$('section.hero'))!;
    expect(await hero.$eval('p', node => node.textContent)).toEqual(
      'AIM is a terrorist organization bent on destroying the world.'
    );
    await expect(await hero.$('p')).toMatch(
      'AIM is a terrorist organization bent on destroying the world.'
    );
    expect(await hero.$eval('h1', node => node.textContent)).toEqual('A.I.M.');
    await expect(await hero.$('h1')).toMatch('A.I.M.');
  }

  await page.goBack();

  {
    await page.waitForSelector('section.card > div.card-body > h5.card-title');

    const heroes = await page.$$('section.card');
    expect(heroes).toHaveLength(50);

    const lastHeroCard = heroes[49];
    expect(await lastHeroCard.$eval('h5.card-title', node => node.textContent)).toEqual(
      'Angela (Aldrif Odinsdottir)'
    );
    await expect(await lastHeroCard.$('h5.card-title')).toMatch('Angela (Aldrif Odinsdottir)');

    const link = (await lastHeroCard.$('div.card-footer > a'))!;
    await link.click();
    // [waitForNavigation doesn't work after clicking a link](https://github.com/GoogleChrome/puppeteer/issues/1412)
    //await page.waitForNavigation();
    await page.waitForSelector('section.hero');

    const hero = (await page.$('section.hero'))!;
    expect(await hero.$eval('p', node => node.textContent)).toEqual(''); // No description
    await expect(await hero.$('p')).toMatch(''); // No description
    expect(await hero.$eval('h1', node => node.textContent)).toEqual('Angela (Aldrif Odinsdottir)');
    await expect(await hero.$('h1')).toMatch('Angela (Aldrif Odinsdottir)');
  }
});
