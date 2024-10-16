import { runCommand } from "./run_command.js";
import { select } from "@inquirer/prompts";

// Checkout to the current active Jira issue
export async function jiracheckout() {
  const result = runCommand(
    `jira issue list -s "In Progress" -a$(jira me) --plain`,
  );
  if (!result) {
    process.exit(1);
  }

  const rows = result.split("\n");
  rows.shift();
  const issues = rows.map((issue) => {
    const values = issue.split("\t");
    const issueType = values[0];
    const issueKey = values[1];
    const issueSummary = values[2];
    return {
      value: issueKey,
      name: `${issueKey} (${issueType}) - ${issueSummary}`,
    };
  });

  if (issues.length === 0) {
    console.log("No issues found in progress");
    process.exit(1);
  } else if (issues.length === 1) {
    const issue = issues[0].value;
    runCommand(`git checkout ${issue} || git checkout -b ${issue}`);
  } else {
    const answer = await select({
      message: "Select an active issue to checkout",
      choices: issues,
    });
    runCommand(`git checkout ${answer} || git checkout -b ${answer}`);
  }
}
