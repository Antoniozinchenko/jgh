import { runCommand } from "./run_command.js";
import { jiraTitle } from "./jiratitle.js";

// Add all changes, get the Jira title, and commit with that message
export function jiracommit() {
  runCommand("git add .");
  const message = jiraTitle();
  if (message) {
    runCommand(`git commit -m "${message}"`);
  }
}

