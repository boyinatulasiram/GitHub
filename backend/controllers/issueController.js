const createIssue = (req,res) =>{
    res.send("Issue Created!");
};


const updateIssueById = (req,res) =>{
    res.send("Issue updated!");
};

const deleteIssueById = (req,res) =>{
    res.send("Issue deleted!");
};

const getAllIssues = (req, res) =>{
    res.send("All issues sent!");
};

const getIssueById = (req,res) =>{
    res.send("Issue fecthed");
};

module.exports = {
    createIssue,
    updateIssueById,
    deleteIssueById,
    getAllIssues,
    getIssueById
}

