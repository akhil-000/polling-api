const Options = require('../models/options');
const User = require('../models/user');
const Questions = require('../models/questions');
    
//create an option for a specific question
module.exports.create = async function(req, res){

    
        let question = await Questions.findById(req.params.id);

        if (question){
            let option = await Options.create({
                text : req.body.text,
                votes:0,
                question:req.params.id
            });

            option.link_to_vote=`https://polling09api.herokuapp.com/options/${option.id}/add_vote`,
            option.save();
            question.options.push(option);
            question.save();


               
    
                return res.status(200).json({
                    data: {
                        option: option
                    },
                    message: "option created!"
                });

           
        }
    }
    


//delete options only if its has no votes
module.exports.destroy = async function(req, res){

    
        let option = await Options.findById(req.params.id);

        let question= await   Questions.findById(option.question);

        if (question.user == req.user.id && option.votes==0){


            let questionId = option.question;

            option.remove();

      await  Questions.findByIdAndUpdate(questionId, { $pull: {options: req.params.id}});

          
                return res.status(200).json({
                    data: {
                        option_id: req.params.id
                    },
                    message: "option deleted"
                });
            }  
            
            else{

                return res.status(200).json({
                   
                    message: "option has votes"
                });


            }
    
}


module.exports.vote = async function(req, res){

let option=await  Options.findById(req.params.id);

let user = await User.findById(req.user.id);


if(!user.voted.includes(req.params.id))
{

user.voted.push(req.params.id);


 option.votes=option.votes+1;
 option.save();
 user.save();

}
else
{

    const index= user.voted.indexOf(req.params.id);

  if (index > -1) { 
    user.voted.splice(index, 1); 
  }
  option.votes=option.votes-1;
  option.save();
  user.save();
}

return res.status(200).json({
    data: {
        option: option,
        user:user
    },
    message: "option voted!"
});


}