const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');

app.use(cors());
app.use(cookieParser());

app.use(express.static('./assets'));
// make the uploads path available to the browser

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');




app.use(bodyParser.urlencoded({
    extended: true
  }));
  
  app.use(bodyParser.json());
// use express router
app.use('/', require('./routes'));


app.use(passport.initialize());


app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});
