// Runs the backend and the Next.js server in one container.
// If either process exits, the other is stopped so the platform restarts the container.
import { spawn } from "node:child_process";
import path from "node:path";

const root = import.meta.dirname;

const processes = [
  spawn("node", ["dist/server.js"], { cwd: path.join(root, "backend"), stdio: "inherit" }),
  spawn("node", ["frontend/server.js"], { cwd: path.join(root, "web"), stdio: "inherit" }),
];

let shuttingDown = false;
function shutdown(code) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of processes) child.kill("SIGTERM");
  setTimeout(() => process.exit(code), 5000).unref();
}

for (const child of processes) {
  child.on("exit", (code) => shutdown(code ?? 1));
}
process.on("SIGTERM", () => shutdown(0));
process.on("SIGINT", () => shutdown(0));
