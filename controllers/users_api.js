const User = require('../models/user');
const jwt = require('jsonwebtoken');

//creating user
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.json('error', 'Passwords do not match');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){ response.json("error") }

        if (!user){
            User.create(req.body, function(err, user){
                if (err) 
				  	res.json("error")
				  else
				  	res.json({status: "success", message: "User added successfully!!!", data: null});
            })
        }else{
            return res.status(200).json( 'You have signed up, login to continue!');
            
        }

    });
}

//loggin in with user credentials
module.exports.createSession = async function(req, res){

    try{
        let user = await User.findOne({email: req.body.email});

        if (!user || user.password != req.body.password){
            return res.json(422, {
                message: "Invalid username or password"
            });
        }

        return res.json(200, {
            message: 'Sign in successful, here is your token, please keep it safe!',
            data:  {
                token: jwt.sign(user.toJSON(), 'codeial', {expiresIn:  '1h'})
            }
        })

    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}