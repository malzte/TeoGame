const express = require('express');
const app = express();
const config = require('./config');
const User = require('./models/User');
const Game = require('./models/Game');
const Listing = require('./models/Listing');
const cors =  require('cors');
const bcrypt  = require('bcrypt');
const saltRounds = 10;

//foreign keys

Listing.belongsTo(Game, {
    foreignKey:"game_id"
});

Game.hasMany(Listing, {
    foreignKey:"game_id"
});

Listing.belongsTo(User, {
    foreignKey:"user_id"
});

User.hasMany(Listing, {
    foreignKey:"user_id"
});

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

config.authenticate().then(function(){
    console.log('Database is connected');
}).catch(function(err){
    console.log(err);
})

app.listen(3000, function(){
    console.log('Server running on port 3000...');
});

//REGISTER
app.post('/register', function(req, res){

    let plainPassword = req.body.password;

    bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
        
        let user_data = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            street_address: req.body.street_address,
            postalcode: req.body.postalcode,
            city: req.body.city,
            country: req.body.country,
            phone: req.body.phone,
            interests: req.body.interests,
            username: req.body.username,
            password: hash
        };

        User.create(user_data).then((result) => {
            res.status(200).send(result);
        }).catch((err) => {
            res.status(500).send(err);
        });

    });    
});

//LOGIN
app.post('/login', function(req, res){

    let email = req.body.email;
    let password = req.body.password;
    let user_data = {
        where: {email} // {email: email}
    }
    
    //Find a user that corresponds to the email
    User.findOne(user_data).then((result) => {

        if(result){
            console.log(result);
            bcrypt.compare(password, result.password, function(err, output) {
                console.log(output);
                if(output){
                    res.status(200).send(result);
                    console.log('User Found');
                    // res.redirect('/listings');
                }else{
                    res.status(400).send('Incorrect password.');
                }
            });            
        }
        else{
            res.status(404).send('User does not exist.');
        }
    }).catch((err) => {
        res.status(500).send(err);
    });
        
});

//GET USER LISTINGS
app.get('/listings/:user_id', function(req, res){
    let userId = req.params.user_id;

    let data = {
        where: {user_id: userId}
    }

    Listing.findAll(data).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

//GET USER INFO
app.get('/users/:user_id', function(req, res){
    let userId = req.params.user_id;

    let data = {
        where: {user_id: userId}
    }

    User.findAll(data).then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(500).send(err);
    });
});


//ALL GETS
app.get('/games', function(req, res){
    Game.findAll().then(function(result){
        res.status(200).send(result);
    }).catch(function(err){
        res.status(500).send(err);
    });
});

app.get('/listings', function(req, res){
    let data ={
        where: {},
        include: Game
    }
    Listing.findAll(data).then(function(result){
        res.status(200).send(result);
    }).catch(function(err){
        res.status(500).send(err);
    });
});

app.get('/users', function(req, res){
    
    User.findAll().then(function(result){
        res.status(200).send(result);
    }).catch(function(err){
        res.status(500).send(err);
    });
});

//ALL POSTS
app.post('/games', function(req, res){
    Game.create(req.body).then(function(result){
        res.redirect('/games');
    }).catch(function(err){
        res.send(err);
    })
});

app.post('/listings', function(req, res){
    Listing.create(req.body).then(function(result){
        res.redirect('/listings');
    }).catch(function(err){
        res.send(err);
    })
});

app.post('/users', function(req, res){
    User.create(req.body).then(function(result){
        res.redirect('/users');
    }).catch(function(err){
        res.send(err);
    })
});

//ALL DELETES

app.delete('/games/:game_id', function(req,res){
    var gameId = req.params.game_id
    Game.findByPk(gameId).then(function(result){
        if(result){
            result.destroy().then(function(){
                res.send(result);
            }).catch(function(err){
                res.send(err);
            });
        } else {
            res.send('Item not found');
        };
    }).catch(function(err){
        res.send(err);
    });
});

app.delete('/listings/:listing_id', function(req,res){
    var listingId = req.params.listing_id
    Listing.findByPk(listingId).then(function(result){
        if(result){
            result.destroy().then(function(){
                res.send(result);
            }).catch(function(err){
                res.send(err);
            });
        } else {
            res.send('Listing not found');
        };
    }).catch(function(err){
        res.send(err);
    });
});

app.delete('/users/:user_id', function(req,res){
    var userId = req.params.user_id
    User.findByPk(userId).then(function(result){
        if(result){
            result.destroy().then(function(){
                res.send(result);
            }).catch(function(err){
                res.send(err);
            });
        } else {
            res.send('User not found');
        };
    }).catch(function(err){
        res.send(err);
    });
});