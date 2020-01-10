const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 4000;

const projectRoutes = express.Router();
const userRoute = express.Router();
let Project = require('./models/Project');
let User = require('./models/User');

app.use(cors());
app.use(bodyParser.json());

var conn_p = mongoose.createConnection('mongodb://localhost:27017/projects', { useNewUrlParser: true, useUnifiedTopology: true })
var conn_u = mongoose.createConnection('mongodb://localhost:27017/users', { useNewUrlParser: true, useUnifiedTopology: true })

var model_p = conn_p.model('Project', Project, 'projects');
var model_u = conn_u.model('User', User, 'users');

const connection = mongoose.connection;

connection.once('open', function(){
    console.log('MongoDB connection succesfully established.');
});

userRoute.route('/:username/:passphrase').get( ( req,res ) => {
    let username = req.params.username;
    let passphrase = req.params.passphrase;
    

    model_u.findOne( { username: username }, ( err, users ) => {
        console.log(users);
        if(!users) {
            res.status(200).send(false);
        } else if(passphrase == users.passphrase) {
            res.status(200).send(true);
        } else {
            res.status(200).send(false);
        }
    })
});

projectRoutes.route('/').get( ( req, res ) => {
    model_p.find( ( err, projects ) => {
        if( err ){
            console.log( err );
        } else {
            res.json(projects);
        }
    });
});

projectRoutes.route('/add').post( function(req, res)  {
    let project = new model_p(req.body);

    project.save().then( project => {
        res.status(200).json({ 'project': `project successfully added to database` });
    })
    .catch( err => {
        res.status(400).send(`project failed to add database`);
    })
});

app.use('/projects', projectRoutes);
app.use('/user', userRoute);

app.listen(PORT, function(){
    console.log(`Server is running on port: ${PORT}`);
});