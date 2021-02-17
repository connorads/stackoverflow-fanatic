import {it, expect, describe} from '@playwright/test';
import {maybeGetBadgeAwardedText} from './lib';

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
