// const { require } = require("yargs");
// const {hideBin} = require("yargs/helpers")
const fs = require("fs").promises;
const path = require("path");

async function initRepo() {
  const repoPath = path.resolve(process.cwd(), ".Git");
  const commitsPath = path.join(repoPath, "commits");
  try {
    await fs.mkdir(repoPath, { recursive: true });
    await fs.mkdir(commitsPath, { recursive: true });
    await fs.writeFile(
        path.join(repoPath, "config.json"),
        JSON.stringify({bucket : "process.env.S3_BUCKET"})
    );
  } catch (err) {
    console.error("Error initializing repo");
  }
  console.log("Repositoy Initialized");
}
module.exports = { initRepo };
