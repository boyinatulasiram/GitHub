const mongoose = require('mongoose');
const Repository = require("../models/repoModel")
const User = require("../models/userModel")
const Issue = require("../models/issueModel")


const createRepository = async (req, res) => {
  const { owner,name,issues, content, description, visibility } = req.body;
  try {
      if(!name){
        return res.status(400).send("Name is required" );
      }
      if(!mongoose.Types.ObjectId.isValid(owner) ){
        return res.status(400).send("Invalid owner ID format");
      }

      const newRepo = new Repository({
        name,
        description,
        content,
        visibility,
        owner,
        issues
      });

      const result = await newRepo.save();
      res.status(201).json({
        message:
          "Repository created successfully",
        repoID: result._id
      });

  }
  catch (err) {
    console.log("Error during creating repository", err.message);
    res.status(500).send("Internal Server Error");
  }
};

const getAllRepositories = async (req, res) => {
  res.send("etched all pository Created");
};

const fetchRepositoryById = async (req, res) => {
  res.send("fetched Repo By Id");
};

const fetchRepositoryByName = async (req, res) => {
  res.send("fetched Repo By Name");
};

const fetchRepositoryForCurrentUser = async (req, res) => {
  res.send("fetched Repo By curr user");
};

const updateRepositoryById = async (req, res) => {
  res.send("updated Repo by id");
};


const toggleVisibilityById = async (req, res) => {
  res.send("updated Repo by id");
};

const deleteRepositoryById = async (req, res) => {
  res.send("deleted Repo by id");
};

module.exports = {
  createRepository,
  getAllRepositories,
  fetchRepositoryById,
  fetchRepositoryByName,
  fetchRepositoryForCurrentUser,
  updateRepositoryById,
  toggleVisibilityById,
  deleteRepositoryById,
};



