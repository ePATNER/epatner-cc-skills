#!/usr/bin/env node
import fs from "node:fs";

const version = process.argv[2];
if (!version) throw new Error("Expected next release version as argv[2]");

const files = ["package.json", "plugin.json", "marketplace.json"];
for (const file of files) {
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  data.version = version;
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
}

for (const entry of fs.readdirSync("plugins", { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const file = `plugins/${entry.name}/plugin.json`;
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  data.version = version;
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`);
}
