import * as playwright from 'playwright';

const maybeGetBadgeAwardedText = (page: playwright.Page) =>
  page.evaluate(() =>
    document
      .getElementsByClassName('single-badge-awarded')[0]
      ?.textContent?.trim()
  );

export {maybeGetBadgeAwardedText};
