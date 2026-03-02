const fs = require("fs").promises;
const path = require("path");
const {v4:uuidv4} = require("uuid");

async function commitRepo(message){
    const repoPath = path.resolve(process.cwd(),".Git");
    const stagedPath = path.join(repoPath, "staging");
    const commitedPath = path.join(repoPath, "commits");
    try{
        const commitID = uuidv4();
        const commitDir = path.join(commitedPath, commitID);
        await fs.mkdir(commitDir,{recursive: true});
        const files = await fs.readdir(stagedPath);
        for(const file of files){
            await fs.copyFile(
                path.join(stagedPath, file),
                path.join(commitDir, file)
            );          
        }
        await fs.writeFile(path.join(commitDir, "commit.json"), JSON.stringify({message,date:new Date().toISOString()}));
        console.log(`Committed changes with ID ${commitID}`);
    } catch(err){
        console.error("Error when commiting",err);
    }
    //console.log("Commit command is executed");
}

module.exports = {commitRepo};