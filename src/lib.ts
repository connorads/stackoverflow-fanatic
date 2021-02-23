import * as playwright from 'playwright';

const maybeGetBadgeAwardedText = (page: playwright.Page) =>
  page.evaluate(() =>
    document
      .getElementsByClassName('single-badge-awarded')[0]
      ?.textContent?.trim()
  );

const screenshotElement = async (
  page: playwright.Page,
  selector: string,
  path: string
) => {
  const element = await page.$(selector);
  const screenshotOptions = {path};
  if (element) {
    await element.screenshot(screenshotOptions);
    console.log('Screenshot saved', screenshotOptions);
  } else {
    console.log('Element not found, screenshot not saved', {
      selector,
    });
  }
};

export {maybeGetBadgeAwardedText, screenshotElement};
