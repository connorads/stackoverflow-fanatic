import {test, expect} from '@playwright/test';
import {getBadgeNumber, maybeGetBadgeAwardedText} from './lib';

test.describe('maybeGetBadgeAwardedText', () => {
  test('returns badge awarded text if user has badge', async ({page}) => {
    await page.goto(
      'https://stackoverflow.com/help/badges/71/enthusiast?userid=4319653'
    );
    const awarded = await maybeGetBadgeAwardedText(page);
    expect(awarded).toBe('Awarded Jan 31, 2021 at 13:34');
  });

  test('returns undefined if user does not have badge', async ({page}) => {
    await page.goto(
      'https://stackoverflow.com/help/badges/146/legendary?userid=4319653'
    );
    const awarded = await maybeGetBadgeAwardedText(page);
    expect(awarded).toBe(undefined);
  });
});

test.describe('getBadgeNumber', () => {
  const consoleLog = console.log;
  test.beforeAll(async () => {
    console.log = () => {};
  });
  test.afterAll(async () => {
    console.log = consoleLog;
  });

  [
    {url: 'https://stackoverflow.com/', badge: 'fanatic', number: 83},
    {url: 'https://superuser.com/', badge: 'fanatic', number: 42},
    {url: 'https://serverfault.com/', badge: 'fanatic', number: 67},
  ].forEach(({url, badge, number}) => {
    test(`returns badge number ${number} for badge ${badge} on ${url}`, async ({
                                                                                 page,
                                                                               }) => {
      await page.goto(url);
      const badgeNumber = await getBadgeNumber(page, url, badge);
      expect(badgeNumber).toBe(number);
    });
  });
});
