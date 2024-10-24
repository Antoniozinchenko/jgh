import { execSync } from "child_process";

// Helper function to execute shell commands and get the output
export function runCommand(command) {
  try {
    return execSync(command, { encoding: "utf-8" }).trim();
  } catch (error) {
    process.exit(1);
  }
}
