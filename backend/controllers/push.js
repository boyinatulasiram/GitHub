const fs = require('fs').promises;
const path = require('path');
const { s3, S3_BUCKET } = require("../config/aws-config");

async function pushRepo() {
    const repoPath = path.resolve(process.cwd(), ".Git");
    const commitsPath = path.join(repoPath, "commits");

    try {
        const commitDirs = await fs.readdir(commitsPath);

        for (const commit of commitDirs) {

            const commitPath = path.join(commitsPath, commit);
            const files = await fs.readdir(commitPath);

            for (const file of files) {

                const filePath = path.join(commitPath, file);
                const fileContent = await fs.readFile(filePath);

                const params = {
                    Bucket: S3_BUCKET,
                    Key: `commits/${commit}/${file}`,
                    Body: fileContent,
                };

                await s3.upload(params).promise();
            }
        }

        console.log("All commits pushed to S3");

    } catch (err) {
        console.error("Error while pushing:", err.message);
    }

    console.log("push command executed");
}

module.exports = { pushRepo };