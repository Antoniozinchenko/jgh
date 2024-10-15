import { runCommand } from "./run_command.js";

// Move the current Jira issue to the "OH to Test" status
export function jirareview() {
  const branch = runCommand("git branch --show-current");
  if (!branch) return;

  runCommand(`jira issue move ${branch} "OH to Test"`);
}
