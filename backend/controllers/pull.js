const fs = require('fs').promises;
const path = require('path');
const { s3, S3_BUCKET } = require("../config/aws-config");

async function pullRepo() {
    const repoPath = path.resolve(process.cwd(), ".Git");
    const commitsPath = path.join(repoPath, "commits");

    try {
        const data = await s3.listObjectsV2({
            Bucket: S3_BUCKET,
            Prefix: "commits/"
        }).promise();

        const objects = data.Contents;

        if (!objects || objects.length === 0) {
            console.log("No commits found in S3");
            return;
        }

        for (const object of objects) {

            const key = object.Key;   // ✅ FIXED

            // Skip folder keys
            if (key.endsWith("/")) continue;

            const localFilePath = path.join(repoPath, key);

            await fs.mkdir(path.dirname(localFilePath), { recursive: true });

            const params = {
                Bucket: S3_BUCKET,
                Key: key,
            };

            const fileContent = await s3.getObject(params).promise();

            await fs.writeFile(localFilePath, fileContent.Body);
        }

        console.log("All commits pulled from S3");

    } catch (err) {
        console.error("Error while pulling:", err.message);
    }
}

module.exports = { pullRepo };