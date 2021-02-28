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
  await git.checkoutLocalBranch(branch);
  console.log('Creating file', filePath);
  await fs.appendFile(filePath, new Date().toISOString());
  console.log('Committing and force pushing file', filePath);
  await git
    .add(filePath)
    .commit('Creating some repo activity 🏃‍')
    .push('origin', branch, ['--force']);
  console.log('Changes pushed to branch', branch);
};

export {maybeGetBadgeAwardedText, screenshotElement, generateFauxRepoActivity};
