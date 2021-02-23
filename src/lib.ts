import * as playwright from 'playwright';
import simpleGit from 'simple-git';
import {promises as fs} from 'fs';

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

const generateFauxRepoActivity = async (
  branch = 'faux-activity-branch',
  filePath = 'faux-activity.txt'
) => {
  const git = simpleGit();
  console.log('Checkout branch', branch);
  await git.checkoutLocalBranch(branch);
  console.log('Creating file', filePath);
  await fs.appendFile(filePath, new Date().toISOString());
  console.log('Committing and pushing file', filePath);
  await git
    .add(filePath)
    .commit('Creating some repo activity 🏃‍', filePath, {
      '--author':
        '"Robot 🤖 <41898282+github-actions[bot]@users.noreply.github.com>"',
    })
    .push('origin', branch, ['--force']);
  console.log('Changes pushed to branch', branch);
};

export {maybeGetBadgeAwardedText, screenshotElement, generateFauxRepoActivity};
