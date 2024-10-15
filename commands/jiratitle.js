import { runCommand } from "./run_command.js";

export function jiraTitle() {
  const branch = runCommand("git branch --show-current");
  if (!branch) return;

  // runCommand(`jira issue view "${branch}" --plain | sed -n '1p' | awk '{print $2}'`);
  const issueTitle = runCommand(`jira issue view "${branch}" --plain | grep '#' | sed -n '1 p' | sed 's/#//' | awk '$1=$1'`);
  const message = `[${branch}] ${issueTitle}`;
  console.log(message);
  return message;
}
