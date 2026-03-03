const express = require('express');
const repoRouter = express.Router();

const repoController = require("../controllers/repoController");

repoRouter.post("/create", repoController.createRepository);
repoRouter.get("/all", repoController.getAllRepositories);
repoRouter.get("/:id", repoController.fetchRepositoryById);
repoRouter.get("/name", repoController.fetchRepositoryById);
repoRouter.get("/:userId", repoController.fetchRepositoryForCurrentUser);
repoRouter.put("/update/:id", repoController.updateRepositoryById);
repoRouter.delete("/delete/:id", repoController.deleteRepositoryById);
repoRouter.patch("/toggle/:id", repoController.toggleVisibilityById);



module.exports = repoRouter;   // 🔥 THIS WAS MISSING