#!/usr/bin/env bun

import * as fs from "fs";
import { execSync } from "child_process";

const setupInfra = () => {
  const infraPath = "infra";
  if (!fs.existsSync(infraPath)) {
    fs.mkdirSync(infraPath, { recursive: true });
    console.log("Infra directory created");
  } else {
    console.log(`Infra directory already exists`);
  }

  // execute shell command npx cdk init app --language=typescript in the infra directory
    const cdkInitCommand = `npx cdk init app --language=typescript`;
    execSync(cdkInitCommand, { cwd: infraPath, stdio: "inherit" });

    const addRepository = `npm i paul-dev-org/cdk-infra`;
    execSync(addRepository, { cwd: infraPath, stdio: "inherit" });
};

setupInfra();