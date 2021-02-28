# Stack Overflow Fanatic

Earn Stack Overflow's Fanatic Badge in an automated fashion using GitHub Actions 🏆

## Instructions

_This is a work in progress. Better instructions TBD ⏰ Below is a draft reminder for the author ..._

1. Fork the repo?
2. Set environment variables?
3. Re-enable workflow?
4. TBC?

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
