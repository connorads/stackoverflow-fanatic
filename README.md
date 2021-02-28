# Stack Overflow Fanatic

[![Become a Fanatic](https://github.com/connorads/stackoverflow-fanatic/actions/workflows/fanatic.yml/badge.svg)](https://github.com/connorads/stackoverflow-fanatic/actions/workflows/fanatic.yml)
[![Tests](https://github.com/connorads/stackoverflow-fanatic/actions/workflows/ci.yml/badge.svg)](https://github.com/connorads/stackoverflow-fanatic/actions/workflows/ci.yml)
[![MIT License](https://img.shields.io/github/license/connorads/stackoverflow-fanatic)](https://github.com/connorads/stackoverflow-fanatic/blob/master/LICENSE)

Earn Stack Overflow's [Fanatic Badge](https://stackoverflow.com/help/badges/83/fanatic) automagically using GitHub Actions 🏆

> Fanatic: Visit the site each day for 100 consecutive days. (Days are counted in UTC.).

## Instructions

### Prerequisites

You need to [set a password for Stack Overflow](https://meta.stackoverflow.com/questions/285427/how-do-i-change-password-of-my-account).

### Setup

1. ⭐ Star this repo (_Optional_ 💕)
2. Create a public or private repo from [this repo template](https://github.com/connorads/stackoverflow-fanatic/generate)
3. Add your Stack Overflow credentials to your repo's GitHub Actions Secrets
   - ⚙ Settings > Secrets > New repository secret
     - `STACKOVERFLOW_EMAIL`
     - `STACKOVERFLOW_PASSWORD`
4. Manually run the "Become a Fanatic" workflow (_Optional_)
   - ▶ Actions > Become a Fanatic > Run workflow

### Usage

Once the setup has been completed then the workflow will run daily at 1am UTC, log into your Stack Overflow profile and record your Fanatic Badge progress.

There shouldn't be a need to monitor the workflow but if you look at the workflow logs or artifacts (screenshots) you can see the progress.

Sometime after you've earned the Fanatic Badge the scheduled workflow will stop running.

## FAQ

### Isn't this cheating to get something which is already a bit pointless?

Yes, but it was fun to make.

### But why?

No good reason of course.

I accidentally earned the [Enthusiast Badge](https://stackoverflow.com/help/badges/71/enthusiast) for visiting Stack Overflow for 30 consecutive days (how sad 🤓)

I then hoped to earn the Fanatic Badge but I decided to not do any coding for one day (unforgivable 🤦‍♂️) and lost my progress 😭

I found this [Meta Stack overflow question](https://meta.stackoverflow.com/questions/351223/is-it-allowed-to-make-a-simple-automatic-program-that-earns-you-the-fanatic-badg) on writing a program to earn the Fanatic Badge. Other people have done this before but they all required deploying to some infrastructure like Heroku or AWS. I asked myself _"Could this be done with GitHub Actions?"_ to which the answer seems to be _"Yes, technically"_.

It was also a good excuse to give [Playwright](https://playwright.dev/) a go.

### Can I get banned from Stack Overflow for this?

[Probably not](https://meta.stackoverflow.com/a/351224/4319653).

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
