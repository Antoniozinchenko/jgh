# Jira + Github cli tool

This is a simple cli tool that allows you to create a git branch based on a Jira issue, create a pull requests on Github and move ticket on jira board.

install  [jira-cli](https://github.com/ankitpokhrel/jira-cli) and [qithub cli (gh)](https://cli.github.com/) before you start

## Installation

Add JIRA_API_TOKEN and JIRA_DOMAIN to your environment variables in .zshrc or .bashrc

```bash
# generate jira api token with your account here https://id.atlassian.com/manage-profile/security/api-tokens
export JIRA_API_TOKEN=<YOUR_API_TOKEN_HERE>
# example: https://yourcompany.atlassian.net - your domain should is 'yourcompany'
export JIRA_DOMAIN=<YOUR_JIRA_DOMAIN> 
```
Install npm package globally 
```bash
npm install -g https://github.com/Antoniozinchenko/jgh
```

## Commands

When you start working on a new issue, just run `jgh start` or `jgh st` for creating a new branch based on jira ticket from backlog
```bash
$ jgh start
```

Just use `jgh checkout` or `jgh co` for finding your jira issue which has status 'In Progress' and do `git checkout` with correct branch name
```bash
$ jgh checkout
```

When you finish with code edit just run `jgh push` for making commit and create pull request with issue title
```bash
$ jgh push
```
If your want also to move ticket in jira board, just add `--review` flag
```bash
$ jgh push --review
```
