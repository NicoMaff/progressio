# Issue tracker: GitHub

Issues and PRDs for this repository live as GitHub issues. Use the `gh` CLI for all operations.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body "..."`. Use a heredoc for multi-line bodies.
- **Read an issue**: `gh issue view <number> --comments`, filtering comments by `jq` and also fetching labels.
- **List issues**: `gh issue list --state open --json number,title,body,labels,comments --jq '[.[] | {number, title, body, labels: [.labels[].name], comments: [.comments[].body]}]'` with appropriate `--label` and `--state` filters.
- **Comment on an issue**: `gh issue comment <number> --body "..."`.
- **Apply or remove labels**: `gh issue edit <number> --add-label "..."` or `--remove-label "..."`.
- **Close**: `gh issue close <number> --comment "..."`.

Infer the repository from `git remote -v`; `gh` does this automatically when run inside a clone.

## GitHub Project and issue relationships

- Add every specification and ticket created with `to-spec` or `to-tickets` to the `progressio` GitHub Project.
- A specification is the parent issue. When a parent specification exists, create its tickets as native GitHub sub-issues.
- Establish every applicable native GitHub issue relationship, including parent-child, `blocking`, and `blocked by` dependencies.
- When `to-spec` creates a specification, set that specification's status in the `progressio` GitHub Project to `Backlog`.
- When `to-tickets` creates the sub-issues of a specification, set that parent specification's status to `Ready`.
- When `implement` is invoked for a sub-issue, immediately set that ticket's status in the `progressio` GitHub Project to `In Progress`, before changing code, and set its parent specification's status to `In Progress`.
- When every sub-issue of a specification is `Done`, set that parent specification's status to `Done`.
- When creating a pull request for an implementation, automatically link it to the ticket currently being implemented (for example with `Closes #<number>` in the PR body).
- Once created, add the pull request to the `progressio` GitHub Project and set its project status to `In Review`.

## Pull requests as a triage surface

**PRs as a request surface: no.**

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --comments`.
