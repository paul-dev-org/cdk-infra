#!/usr/bin/env bun

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

  //copy from templates/release-please.yaml to .github/workflows/
  const releasePleaseTemplate = fs.readFileSync(
    path.resolve(__dirname, "templates/release-please.yaml"),
    "utf8"
  );

  fs.writeFileSync(
    path.resolve(__dirname, workflowsPath, "release-please.yaml"),
    releasePleaseTemplate
  );
};

createWorkflows();
