require('dotenv').config({path: __dirname + '/.env'})
const path = require('path');
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

const DB_UN = process.env['DB_USERNAME'];
const DB_PW = process.env['DB_PASSWORD'];

app.use(cors());
app.use(bodyParser.json());

var conn_p = mongoose.createConnection(`mongodb://${DB_UN}:${DB_PW}@ds213529.mlab.com:13529/aarontjdev`, { useNewUrlParser: true, useUnifiedTopology: true })
// var conn_u = mongoose.createConnection('mongodb://localhost:27017/users', { useNewUrlParser: true, useUnifiedTopology: true })

var model_p = conn_p.model('Project', Project, 'projects');
var model_u = conn_p.model('User', User, 'users');

//const connection = mongoose.connection;
//
//connection.once('open', function(){
//    console.log('MongoDB connection succesfully established.');
//});

userRoute.route('/:username/:passphrase').get( ( req,res ) => {
    let username = req.params.username;
    let passphrase = req.params.passphrase;

    model_u.findOne( { username: username }, ( err, user ) => {
        if(!user) {
            res.status(200).send(false);
        } else if(passphrase == user.passphrase) {
            res.status(200).send(user);
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

projectRoutes.route('/edit/:id').post( ( req,res ) => {
    let id = req.params.id;
    console.log(id)

    model_p.findById( id, ( err, project ) => {
        if(!project) {
            res.status(404).send("Project not found!");
        } else {
            console.log(`project found : ${req.body}`)
            project.name = req.body.name; 
            project.tech = req.body.tech; 
            project.link = req.body.link;

            project.update(project).then( project => {
                res.json("Project updated!");
            }).catch( err => {
                res.status(400).send("Update failed.")
            })
        }
    })
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

app.use(express.static("client/build"));
app.get("*", (req, res) => {
res.sendFile(path.resolve(__dirname, "../build/", "index.html"));
});

app.listen(PORT, function(){
    console.log(`Server is running on port: ${PORT}`);
});