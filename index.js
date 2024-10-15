#!/usr/bin/env node

import { jiracheckout } from "./commands/jiracheckout.js";
import { jirapush } from "./commands/jirapush.js";
import { jirastart } from "./commands/jirastart.js";

const args = process.argv.slice(2);

if (!process.env.JIRA_DOMAIN || !process.env.JIRA_API_TOKEN) {
  console.log("Please set JIRA_DOMAIN and JIRA_API_TOKEN environment variables");
  process.exit(1);
}

if (args.length === 0) {
  console.log(`Please provide a command
  Available commands:
    - start: pick jira ticket from backlog, create branch and move ticket to in progress
    - checkout: checkout to a jira ticket which is in progress
    - push [--review]: create commit, push and create pull request based on current branch`);
} else {
  const command = args[0];

  switch (command) {
    case "start":
    case "st":
      jirastart();
      break;
    case "checkout":
    case "co":
      jiracheckout();
      break;
    case "push":
      jirapush(args[1] === "--review" || args[1] === "-r");
      break;
    default:
      console.log(`Command not found: ${command}`);
      break;
  }
}
