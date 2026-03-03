const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { MongoClient, ReturnDocument } = require('mongodb');
const dotenv = require('dotenv');
var ObjectId = require("mongodb").ObjectId;
dotenv.config();
// const { MongoClient } = require("mongodb");

const url = process.env.MONGO_URL;

let client;

async function connectClient() {
    if (!client) {
        client = new MongoClient(url);
        await client.connect();
        console.log("MongoDB Connected (Native Driver)");
    }
    return client;
}

const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        client = await connectClient();

        const db = client.db('githubclone');
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({ username });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 🔥 Store result properly
        const result = await usersCollection.insertOne({
            username,
            email,
            password: hashedPassword,
            repositories: [],
            starRepos: []
        });

        // 🔥 Use insertedId
        const token = jwt.sign(
            { id: result.insertedId },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.status(201).json({ token });

    } catch (err) {
        console.error("Error during signup:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const login = async  (req,res) =>{
    const {email,password} = req.body;
    try{
        await connectClient();
        const db = client.db('githubclone');
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({ message: "Invalid Credentials" });
        const token = jwt.sign({id: user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"});
        
        res.json({ token, userId:user._id });
    }
    catch(err){
        console.error("Error during login:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
    res.send("Logging in");
}

const getAllUsers = async  (req,res) =>{
    try{
         await connectClient();
        const db = client.db('githubclone');
        const usersCollection = db.collection("users");

        const user = await usersCollection.find({}).toArray();
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        res.json({
            user});
    }
    catch(err){
        console.error("Error during fetching all users:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getUserProfile = async (req, res) =>{
    const {id} = req.params;
    // console.log(userId);
    try{
        await connectClient();
        const db = client.db('githubclone');
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({
            _id:new ObjectId(id)
        });
         if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        res.json({user});
    }catch(err){
        console.error("Error during fetching all users:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateUserProfile = async (req, res) => {
    const { id } = req.params;
    let { email, password } = req.body;

    try {

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
        }

        client = await connectClient();
        const db = client.db('githubclone');
        const usersCollection = db.collection("users");

        const updatedUser = await usersCollection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: { email, password } },
            { returnDocument: "after" }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);

    } catch (err) {
        console.error("Error updating user:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteUserProfile = async (req, res) => {
    const { id } = req.params;

    try {

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID" });
        }

        const client = await connectClient();
        const db = client.db("githubclone");
        const usersCollection = db.collection("users");

        const result = await usersCollection.deleteOne({
            _id: new ObjectId(id)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });

    } catch (err) {
        console.error("Error deleting user:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    getAllUsers,
    login,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    signup
}  ;
