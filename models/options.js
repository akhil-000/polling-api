const mongoose = require('mongoose');


const optionsSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    votes: {
        type:Number,
       
    },
    link_to_vote: {
        type:String,
       
    },
    question: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }

},{
    timestamps: true
});

const Options = mongoose.model('Options', optionsSchema);
module.exports = Options;