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
- When `to-spec` creates a specification, apply the `spec` label and set its project status to `Backlog`.
- A specification is the parent issue. When `to-tickets` creates a ticket, apply the `ticket` label, set the ticket status to `Ready`, create a native GitHub sub-issue relationship to its specification, and retain an annotation in the ticket body identifying its parent specification.
- Create native `Blocked by` dependencies only when a ticket actually depends on another ticket. Retain useful dependency annotations in issue bodies as well.
- After every ticket is created and linked, set the parent specification's status to `Ready`.
- When `implement` is invoked for a sub-issue, immediately set that ticket's status and its parent specification's status to `In Progress`, before changing code.
- When creating a pull request for an implementation, link it to the ticket with `Closes #<number>` in the PR body and set the ticket status to `In Review`.
- After a pull request is merged, set the linked ticket status to `Done`. Set the parent specification to `Done` only after every one of its sub-issues is `Done`.
- If a pull request is closed without merging, return the linked ticket to `In Progress`.

## Pull requests as a triage surface

**PRs as a request surface: no.**

## When a skill says "publish to the issue tracker"

Create a GitHub issue.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --comments`.
