import fs from "fs";

export const createWorkflows = () => {
  const workflowsPath = ".github/workflows";
  if (!fs.existsSync(workflowsPath)) {
    fs.mkdirSync(workflowsPath, { recursive: true });
    console.log("Workflows directory created");
  } else {
    console.log(`Workflows directory already exists`);
  }
};
