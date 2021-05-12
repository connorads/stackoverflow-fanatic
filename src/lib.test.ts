import {it, expect, describe, beforeAll, afterAll} from '@playwright/test';
import {getBadgeNumber, maybeGetBadgeAwardedText} from './lib';

describe('maybeGetBadgeAwardedText', () => {
  it('returns badge awarded text if user has badge', async ({page}) => {
    await page.goto(
      'https://stackoverflow.com/help/badges/71/enthusiast?userid=4319653'
    );
    const awarded = await maybeGetBadgeAwardedText(page);
    expect(awarded).toBe('Awarded Jan 31 at 13:34');
  });

  it('returns undefined if user does not have badge', async ({page}) => {
    await page.goto(
      'https://stackoverflow.com/help/badges/146/legendary?userid=4319653'
    );
    const awarded = await maybeGetBadgeAwardedText(page);
    expect(awarded).toBe(undefined);
  });
});

describe('getBadgeNumber', () => {
  const consoleLog = console.log;
  beforeAll(async () => {
    console.log = () => {};
  });
  afterAll(async () => {
    console.log = consoleLog;
  });

  [
    {url: 'https://stackoverflow.com/', badge: 'fanatic', number: 83},
    {url: 'https://superuser.com/', badge: 'fanatic', number: 42},
    {url: 'https://serverfault.com/', badge: 'fanatic', number: 67},
  ].forEach(({url, badge, number}) => {
    it(`returns badge number ${number} for badge ${badge} on ${url}`, async ({
      page,
    }) => {
      await page.goto(url);
      const badgeNumber = await getBadgeNumber(page, url, badge);
      expect(badgeNumber).toBe(number);
    });
  });
});
