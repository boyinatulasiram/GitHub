const mongoose = require("mongoose");
const { required } = require("yargs");
const { Schema } = mongoose;

const RepositorySchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    content: [
        {
            type: String,
        },
    ],
    visibility:{
        type:Boolean,
        default: true,
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    issues:[
        {
            type:Schema.Types.ObjectId,
            ref:"Issue",
        }
    ]
});

module.exports = mongoose.model("Repository", RepositorySchema);
