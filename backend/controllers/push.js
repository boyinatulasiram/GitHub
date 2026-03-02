const fs = require('fs').promises;
const path = require('path');
const {s2,S3_BUCKET} = require("../config/aws-config");

async function pullRepo (){
    const repoPath =path.resolve(process.cwd(), ".Git" );
    const commitPath = path.join(repoPath, "commits" );
    try{
        const commitDir = await fs.readdir(commitPath);
    } catch(err){
        console.error("Error while pushing", err);
    }
    console.log("pushl command executed");
}

module.exports = {pullRepo} ;