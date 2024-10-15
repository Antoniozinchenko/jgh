import { runCommand } from "./run_command.js";

// Commit changes, push to the remote repository, and create a pull request
export function jirapush(review = false) {
  const domain = process.env.JIRA_DOMAIN;
  jiracommit();
  const branch = runCommand("git branch --show-current");
  if (!branch) return;

  runCommand(`git push -u origin ${branch}`);
  const prTitle = runCommand("git log -1 --pretty=%B");
  const prUrl = `https://${domain}.atlassian.net/browse/${branch}`;
  runCommand(`gh pr create --title "${prTitle}" --body "${prUrl}"`);

  if (review) {
    jirareview();
  }
}
