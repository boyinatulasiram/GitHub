const express = require("express");
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const http = require("http");
const {Server} = require("socket.io");

dotenv.config();

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controllers/init");
const {addRepo} = require("./controllers/add");
const {commitRepo} = require("./controllers/commit");
const {pushRepo} = require("./controllers/push");
const {pullRepo} = require("./controllers/pull");
const {revertRepo} = require("./controllers/revert");

//routes
const mainRouter = require("./routes/mainRouter");

const startServer = () => {
    const app = express();
    const port = process.env.PORT || 8080
     
    app.use(bodyParser.json());
    app.use(express.json());

    const mongoURL = process.env.MONGO_URL;
    mongoose.connect(mongoURL).then(() =>{
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log("Failed to connect MongoDB", err); 
    });

    app.use(cors({
        origin: "*",
    }));
    app.use("/", mainRouter);

    // app.get("/",(req,res)=>{
    //     res.send("Welcome home");
    // })
    const httpServer = http.createServer(app);
    const io = new Server(httpServer, {
        cors: {
            origin: "*",

            methods: ["GET", "POST"],
        }
    });
    io.on("connection", (socket)=>{
        socket.on("join_room",(userID) =>{
            user = userID;
            console.log("======");
            console.log(user);
            console.log("=====");
            socket.join(userID);
        });

    })
    const db = mongoose.connection;
    db.once("open", async ()=>{
        console.log("CRUD Operations called");

    })
    httpServer.listen(port, ()=>{
        console.log(`Server is running on port ${port}`);
    });
}



yargs(hideBin(process.argv)).command(
    'init', 
    "Initialize a new repository", 
    {}, 
    initRepo
).command("start","Starts a new Server",{},startServer)
.command(
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
    "Revert to a commit",
    {},
    (argv) => {
        revertRepo(argv.commitId);
    }
)
.demandCommand(1,"You need at least one command").help().argv;