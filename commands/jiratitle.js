import { runCommand } from "./run_command.js";

const defaultBranches = [
  "main",
  "master",
  "qa",
  "dev",
  "stage",
  "develop",
  "development",
];
export function jiraTitle() {
  const branch = runCommand("git branch --show-current");
  if (!branch) {
    process.exit(1);
  }

  if (defaultBranches.includes(branch)) {
    console.log(
      `You are on the default branch: ${branch}. please checkout to a feature branch`,
    );
    process.exit(1);
  }
  // runCommand(`jira issue view "${branch}" --plain | sed -n '1p' | awk '{print $2}'`);
  const issueTitle = runCommand(`jira issue view "${branch}" --plain | grep '#' | sed -n '1 p' | sed 's/#//' | awk '$1=$1'`);
  const message = `[${branch}] ${issueTitle}`;
  console.log(message);
  return message;
}
