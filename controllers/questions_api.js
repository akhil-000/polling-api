const Questions = require('../models/questions');
const Options = require('../models/options');
const User = require('../models/user');

//creating a question by a user
module.exports.create = async function(req, res){
    try{
        let question = await Questions.create({
            title: req.body.title,
            user: req.user._id
        });            

            return res.status(200).json({
                data: {
                question: question
                },
                message: "question created!"
            });

     

    }catch(err){
        
        return res.json(err);
    }
  
}

//list of questions
module.exports.getall = async function(req, res){
    let questions = await Questions.find({})
        .sort('-createdAt')
        .populate('user')
        .populate('options')

    return res.status(200).json({
        message: "List of questions",
        questions: questions
    })
}


//get specific question
module.exports.getone = async function(req, res){
    let question = await Questions.findById(req.params.id)
        .sort('-createdAt')
        .populate('user')
        .populate('options')

    return res.status(200).json({
        message: "queried question",
        question: question
    })
}


//deleting a question for the matched user and if none of options has votes
module.exports.destroy = async function(req, res){
var arr=[];
    try{
        let question = await Questions.findById(req.params.id);
        console.log("user"+question.user._id+""+req.user._id)

console.log(question.options);

for(var i=0;i<question.options.length;i++){

  var x=question.options[i].toString();
    let option=await Options.findById(x);
    arr.push(option.votes);



}


        if (question.user._id+""== req.user._id+"" && !arr.includes(1)){
            
            question.remove();

            await Options.deleteMany({question: req.params.id});


    
            return res.status(200).json( {
                message: "Question and associated options deleted successfully!"
            });
        }else{
            return res.json( {
                message: "question has votes!"
            });
        }

    }catch(err){
        console.log('********', err);
        return res.status(500).json( {
            message: "Internal Server Error"
        });
    }
    
}




