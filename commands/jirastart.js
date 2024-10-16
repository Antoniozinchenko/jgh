import { runCommand } from "./run_command.js";
import { select } from "@inquirer/prompts";

// Checkout to the current active Jira issue
export async function jirastart() {
  const result = runCommand(
    `jira issue list -s "Backlog" "Selected for development" -a$(jira me) --order-by rank --plain`,
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
  } else {
    const answer = await select({
      message: "Select an issue from backlog and move it to 'in progress'",
      choices: issues,
      loop: false,
    });
    runCommand(`git checkout ${answer} || git checkout -b ${answer}`);
    runCommand(`jira issue move ${answer} "In Progress"`);
    console.log(`Issue ${answer} is now in progress`);
  }
}
