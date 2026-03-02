const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controllers/init");
const {addRepo} = require("./controllers/add");
const {commitRepo} = require("./controllers/commit");
const {pushRepo} = require("./controllers/push");
const {pullRepo} = require("./controllers/pull");
const {revertRepo} = require("./controllers/revert");

yargs(hideBin(process.argv)).command(
    'init', 
    "Initialize a new repository", 
    {}, 
    initRepo
).command(
    'add <file>', 
    "Add a file to repository", 
    (yargs)=>{
        yargs.positional("file",{
            describe : "File to add to the staging area",
            type : "string"
        }
        )
    },  
    (argv) =>{
        addRepo(argv.file);
    }
).command(
    'commit <message>',
    "Commit files to a repository",
    (yargs)=>{
        yargs.positional("message",{
            describe : "Commit Message",
            type : "string"
        })
    },
     (argv) => {
        commitRepo(argv.message);
    }
).command(
    'push' ,
    "Push commits to repository on cloud",
    {},
    pushRepo
).command(
    'pull',
    'Pull latest commit from repository in cloud',
    {},
    pullRepo
).command(
    'revert <commitId>',
    "Revert to a commit of having commitId from repo",
    (yargs) => {
        yargs.positional("commitId",
        {
            describe:
                "Commit Id to revert to",
            type: "string"
        })
    },
    revertRepo
)
.demandCommand(1,"You need at least one command").help().argv;