#!/usr/bin/env node

const path = require("path");
const fs = require("fs");

createWorkflows = () => {
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
