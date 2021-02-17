require('dotenv').config();

import * as playwright from 'playwright';
import {Octokit} from '@octokit/core';
import * as env from 'env-var';
import {maybeGetBadgeAwardedText} from './lib';

(async () => {
  const email = env.get('STACKOVERFLOW_EMAIL').required().asString();
  const password = env.get('STACKOVERFLOW_PASSWORD').required().asString();

  const browser = await playwright['chromium'].launch();
  const page = await browser.newPage();

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

  // Take screenshot
  const screenshotOptions = {path: 'fanatic.png'};
  await page.screenshot(screenshotOptions);
  console.log('Screenshot saved', screenshotOptions);

  // If use has Fanatic badge then disable the GitHub Action workflow
  if (awarded) {
    console.log('Fanatic awarded, disabling workflow');
    const octokit = new Octokit({auth: process.env.GITHUB_TOKEN});
    const [owner, repo] = env
      .get('GITHUB_REPOSITORY')
      .required()
      .asString()
      .split('/');
    await octokit.request(
      'PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/disable',
      {
        owner,
        repo,
        workflow_id: env.get('GITHUB_ACTION').required().asInt(),
      }
    );
    console.log('Workflow disabled');
  }

  await browser.close();
})();
