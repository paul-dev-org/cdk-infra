#!/usr/bin/env ts-node-script

import * as path from "path";
import * as fs from "fs";

const createWorkflows = () => {
  const workflowsPath = ".github/workflows";
  if (!fs.existsSync(workflowsPath)) {
    fs.mkdirSync(workflowsPath, { recursive: true });
    console.log("Workflows directory created");
  } else {
    console.log(`Workflows directory already exists`);
  }

  const releasePleaseTemplate = fs.readFileSync(
    path.resolve(__dirname, "../templates/release-please.yaml"),
    "utf8"
  );

  const deployTemplate = fs.readFileSync(
    path.resolve(__dirname, "../templates/deploy.yaml"),
    "utf8"
  );

  fs.writeFileSync(
    path.resolve(workflowsPath, "release-please.yaml"),
    releasePleaseTemplate
  );

  fs.writeFileSync(
    path.resolve(workflowsPath, "deploy.yaml"),
    deployTemplate
  );

  console.log("\x1b[43m\x1b[30m%s\x1b[0m", "IMPORTANT");
  console.log("\x1b[43m\x1b[30m%s\x1b[0m", "Make sure to create environment stg and prd in the github repository settings");
  console.log("\x1b[43m\x1b[30m%s\x1b[0m", "Add people to the environment protection rules");
};

createWorkflows();
