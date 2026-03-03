const express = require('express');
const userRouter = require("../routes/userRouter");
const repoRouter = require("../routes/repoRouter");
const issueRouter = require("../routes/issueRouter");
const mainRouter = express.Router();

mainRouter.use("/users", userRouter);
mainRouter.use("/repo", repoRouter);
mainRouter.use("/issue",issueRouter);  

mainRouter.get('/', (req, res) => {
    res.send('Hello from main router');
});

module.exports = mainRouter;