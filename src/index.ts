require('dotenv').config();

import * as playwright from 'playwright';
import * as env from 'env-var';

import {
  generateFauxRepoActivity,
  maybeGetBadgeAwardedText,
  screenshotElement,
} from './lib';

(async () => {
  const email = env.get('STACKOVERFLOW_EMAIL').required().asString();
  const password = env.get('STACKOVERFLOW_PASSWORD').required().asString();

  const browser = await playwright['chromium'].launch();
  const page = await browser.newPage();

  console.log('Become a Fanatic', {startTime: new Date().toISOString()});

  // Login to Stack Overflow
  await page.goto('https://stackoverflow.com/users/login');
  console.log('url', page.url());
  await page.waitForSelector('#email');
  await page.type('#email', email);
  await page.type('#password', password);
  await Promise.all([page.waitForNavigation(), page.click('#submit-button')]);

  // Go to profile
  console.log('url', page.url());
  await Promise.all([page.waitForNavigation(), page.click('.my-profile')]);

  // Go to user's Fanatic badge page
  console.log('url', page.url());
  const userid = page.url().split('/')[4];
  console.log('userid', userid);
  await page.goto(
    `https://stackoverflow.com/help/badges/83/fanatic?userid=${userid}`
  );

  // Has the user been awarded the Fanatic badge yet?
  console.log('url', page.url());
  const awarded = await maybeGetBadgeAwardedText(page);
  console.log('Fanatic awarded?', awarded || 'No');
  await screenshotElement(page, '#mainbar', 'awarded.png');

  if (!awarded) {
    // If user does not have Fanatic badge yet capture Fanatic badge progress
    await Promise.all([page.waitForNavigation(), page.click('.my-profile')]);
    console.log('url', page.url());
    await page.click('#badge-card-settings');
    const progressSelector = '[data-badge-database-name="Fanatic"]';
    await page.waitForSelector(progressSelector);
    const text = await page.evaluate(
      (selector: string) =>
        document.querySelector(selector)?.querySelector('.s-badge--label')
          ?.textContent,
      progressSelector
    );
    console.log('Progress:', text);
    await screenshotElement(page, progressSelector, 'progress.png');

    // Create repo activity so that workflow doesn't become disabled
    // TODO only run on day 42
    await generateFauxRepoActivity();
  }

  await browser.close();
})();
