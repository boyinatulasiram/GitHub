const fs = require("fs").promises;
const path = require("path");

async function revertRepo(commitID) {

    const repoPath = path.resolve(process.cwd(), ".Git");
    const commitsPath = path.join(repoPath, "commits");
    const commitDir = path.join(commitsPath, commitID);

    try {
        const files = await fs.readdir(commitDir);

        const projectRoot = process.cwd();

        for (const file of files) {

            // Skip commit metadata file
            if (file === "commit.json") continue;

            await fs.copyFile(
                path.join(commitDir, file),
                path.join(projectRoot, file)
            );
        }

        console.log(`Reverted to commit ${commitID}`);

    } catch (err) {
        console.error("Error during reverting:", err.message);
    }

    console.log("revert command executed");
}

module.exports = { revertRepo };