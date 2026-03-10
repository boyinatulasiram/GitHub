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
  try{
        const repositories = await Repository.find({}).populate('owner').populate('issues');  
        res.status(200).json(repositories);
  } catch(err){
    console.log("Error during fetching repositories", err.message);
    res.status(500).send("Internal Server Error");
  }
};

const fetchRepositoryById = async (req, res) => {
  const { id } = req.params;
  try{
    const repository = await Repository.findById(id).populate('owner').populate('issues');
    if(!repository)
      return res.status(404).send("Repository not found");
    res.status(200).json(repository);
  }
  catch(err){
    console.log("Error during fetching repository by id", err.message);
    res.status(500).send("Internal Server Error");
  }
};

const fetchRepositoryByName = async (req, res) => {
  const { name } = req.params;
  try{
    const repository = await Repository.findOne({ name }).populate('owner').populate('issues');
    if(!repository)
      return res.status(404).send("Repository not found");
    res.status(200).json(repository);
  }
  catch(err){
    console.log("Error during fetching repository by name", err.message);
    res.status(500).send("Internal Server Error");
  }
};

const fetchRepositoryForCurrentUser = async (req, res) => {
   const { id } = req.params;
  try{
    const repositories = await Repository.findById(id);
    if(!repositories || repositories.length === 0)
      return res.status(404).send("Repository not found");
    res.status(200).json(repositories);
  }
  catch(err){
    console.log("Error during fetching repository of current user", err.message);
    res.status(500).send("Internal Server Error");
  }
};

const updateRepositoryById = async (req, res) => {
  const { id } = req.params;
  const {content, description} = req.body;
   try{
    const repository = await Repository.findById(id);
    if(!repository || repository.length === 0)
      return res.status(404).send("Repository not found");
    repository.content.push(content);
    repository.description = description || repository.description;
    const updatedRepository = await repository.save();
    res.status(200).json("repo updated succesfully",updatedRepository);
    
  }
  catch(err){
    console.log("Error during updating repository", err.message);
    res.status(500).send("Internal Server Error");
  }
};


const toggleVisibilityById = async (req, res) => {
  const { id } = req.params;
   try{
    const repository = await Repository.findById(id);
    if(!repository || repository.length === 0)
      return res.status(404).send("Repository not found");
    repository.visibility = !repository.visibility;
    const updatedRepository = await repository.save();
    res.status(200).json("repo visibility toggled succesfully",updatedRepository);
    
  }
  catch(err){
    console.log("Error during toggling repository visibility", err.message);
    res.status(500).send("Internal Server Error");
  }
};

const deleteRepositoryById = async (req, res) => {
  const { id } = req.params;
   try{
    const repository = await Repository.findByIdAndDelete(id);
    if(!repository || repository.length === 0)
      return res.status(404).send("Repository not found");
    res.status(200).json("Repository deleted successfully");
  }
  catch(err){
    console.log("Error during deleting repository", err.message);
    res.status(500).send("Internal Server Error");
  }
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



