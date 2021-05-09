import * as playwright from 'playwright';
import simpleGit, {ResetMode} from 'simple-git';
import {promises as fs} from 'fs';

const maybeGetBadgeAwardedText = (page: playwright.Page) =>
  page.evaluate(() =>
    document
      .getElementsByClassName('single-badge-awarded')[0]
      ?.textContent?.trim()
  );

const getBadgeNumber = async (
  page: playwright.Page,
  url: string,
  badge = 'fanatic',
  log = console.log
): Promise<number> => {
  log('Go to badges page');
  await page.goto(`${url}help/badges`);
  log('url', page.url());
  log(`Try to click badge: ${badge}`);
  await Promise.all([page.waitForNavigation(), page.click(`text=${badge}`)]);
  log('url', page.url());
  const badgeNumber = parseInt(page.url().split('/')[5]);
  log('Got badge number', [badge, badgeNumber]);
  return badgeNumber;
};

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

const generateFauxRepoActivity = async (
  branch = 'master',
  filePath = 'faux-activity.txt'
) => {
  console.log('Creating faux repo activity using git');
  const git = simpleGit();
  const config = await git.listConfig();
  if (!config.all['user.name'] || !config.all['user.email']) {
    console.log('Configuring git user');
    git
      .addConfig('user.name', 'GitHub Robot 🤖')
      .addConfig(
        'user.email',
        '41898282+github-actions[bot]@users.noreply.github.com'
      );
  }
  console.log('Checking out branch', branch);
  await git.checkout(branch);
  console.log('Creating file', filePath);
  await fs.appendFile(filePath, new Date().toISOString());
  console.log('Committing and pushing file', filePath);
  await git
    .add(filePath)
    .commit('Creating some repo activity 🏃‍')
    .push('origin', branch);
  console.log('Hard resetting to HEAD~1 and force pushing');
  await git
    .reset(ResetMode.HARD, ['HEAD~1'])
    .push('origin', branch, ['--force']);
  console.log('Changes pushed to branch', branch);
};

export {
  maybeGetBadgeAwardedText,
  getBadgeNumber,
  screenshotElement,
  generateFauxRepoActivity,
};
