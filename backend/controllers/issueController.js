const mongoose = require('mongoose');
const Repository = require("../models/repoModel")
const User = require("../models/userModel")
const Issue = require("../models/issueModel")
const createIssue = async (req, res) => {
    const { title, description} = req.body;
    const {id} = req.params;
    try {
        const issue = new Issue({
            title,
            description,
            repository: id
        });
        const result = await issue.save();
        res.status(201).json({
            message: "Issue created successfully",
            issueID: result._id
        });
    } catch (err) {
        console.log("Error during creating issue", err.message);
        res.status(500).send("Internal Server Error");
    }
};

const updateIssueById = async (req, res) => {
    const { id } = req.params;
    const { title, description,status} = req.body;
    try {
        const issue = await Issue.findById(id);
        if (!issue) {
            return res.status(404).send("Issue not found");
        }
        issue.status = status || issue.status;
        issue.title = title || issue.title;
        issue.description = description || issue.description;
        const updatedIssue = await issue.save();
        res.status(200).json("Issue updated successfully", updatedIssue);
    } catch (err) {
        console.log("Error during updating issue", err.message);
        res.status(500).send("Internal Server Error");
    }
};

const deleteIssueById = async (req, res) => {
    const { id } = req.params;
    try {
        const issue = await Issue.findByIdAndDelete(id);
        if (!issue) {
            return res.status(404).send("Issue not found");
        }
        res.status(200).json("Issue deleted successfully");
    } catch (err) {
        console.log("Error during deleting issue", err.message);
        res.status(500).send("Internal Server Error");
    }
};

const getAllIssues = async (req, res) => {
    const {id} = req.params;
    try {
        const issues = await Issue.find({repository: id});
        res.status(200).json(issues);
    } catch (err) {
        console.log("Error during fetching issues", err.message);
        res.status(500).send("Internal Server Error");
    }
};

const getIssueById = async (req, res) => {
    const { id } = req.params;
    try {
        const issue = await Issue.findById(id);
        if (!issue) {
            return res.status(404).send("Issue not found");
        }
        res.status(200).json(issue);
    } catch (err) {
        console.log("Error during fetching issue by ID", err.message);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    createIssue,
    updateIssueById,
    deleteIssueById,
    getAllIssues,
    getIssueById
}

