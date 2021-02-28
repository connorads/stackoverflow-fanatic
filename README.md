# Stack Overflow Fanatic

Earn Stack Overflow's Fanatic Badge in an automated fashion using GitHub Actions 🏆

## Instructions

### Prerequisites

You need to [set a password for Stack Overflow](https://meta.stackoverflow.com/questions/285427/how-do-i-change-password-of-my-account).

### Setup

1. ⭐ Star this repo (_Optional_ 💕)
2. Click [here](https://github.com/connorads/stackoverflow-fanatic/generate) to create a public or private repo from this repo template
3. Add your Stack Overflow login details to your repo's GitHub Actions Secrets
   - [Settings > Secrets > New repository secret](/settings/secrets/actions/new)
   - Add Stack Overflow email secret
     - Name: `STACKOVERFLOW_EMAIL`
     - Value: `your.email@address.com`
   - Add Stack Overflow password secret
     - Name: `STACKOVERFLOW_PASSWORD`
     - Value: `uRst4cK0verfl0wPasswd`
4. Manually run the [Fanatic workflow](/actions/workflows/fanatic.yml) _(Optional)_

### Usage

Once the setup has been completed then the workflow will run daily at 1am UTC, log into your Stack Overflow profile and record your Fanatic Badge progress.

There shouldn't be a need to monitor the workflow but if you look at the workflow logs or artifacts (screenshots) you can see the progress.

Sometime after you've earned the Fanatic Badge the scheduled workflow will stop running.

## FAQ

### Isn't this against the GitHub Terms of Service?

Maybe. Maybe not.

According to the [GitHub Additional Product Terms](https://docs.github.com/en/github/site-policy/github-additional-product-terms#5-actions-and-packages):

> for example, don't use Actions ... as part of a serverless application

But then it goes on to say:

> but a low benefit Action could be ok if it’s also low burden

And I would argue that this is low burden.

There are other repos such as [upptime](https://github.com/upptime/upptime) acting in a serverless application manner of far greater burden that seem to not get into any trouble.

### Won't GitHub disable the scheduled workflow after 60 days?

To prevent the scheduled workflow from being [disabled automatically after 60 days of repository inactivity](https://docs.github.com/en/actions/managing-workflow-runs/disabling-and-enabling-a-workflow) the workflow will push some changes to the repo after [42](<https://simple.wikipedia.org/wiki/42_(answer)>) days. 60 days later GitHub will disable the workflow which will be after you've earned your Fanatic Badge on day 100.

> Warning: To prevent unnecessary workflow runs, scheduled workflows may be disabled automatically. When a public repository is forked, scheduled workflows are disabled by default. In a public repository, scheduled workflows are automatically disabled when no repository activity has occurred in 60 days.
