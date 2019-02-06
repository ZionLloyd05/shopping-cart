var passport = require('passport');
var User = require('../models/user');
var localStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});

//sign up strategy
passport.use('local.signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    //validate email
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    //validate password
    req.checkBody('password', 'Invalid Password').notEmpty().isLength({min:5});
    //collect all errors if any exist
    var errors = req.validationErrors();

    //checking if error exist
    if(errors){
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
        });

        //returning the error to view with flash
        return done(null, false, req.flash('error', messages));
    }

    User.findOne({'email':email}, function(err, user){
        if(err){
            return done(err);
        }
        if(user){
            return done(null, false, {message: 'Email is already in use. '});
        }

        var newUser = new User();
        newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
        newUser.save(function(err, result){
            if(err){
                return done(err);
            }
            return done(null, newUser);
        });
    });
}));

//sign in strategy
passport.use('local.signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    //validate email
    req.checkBody('email', 'email cannot be empty').notEmpty();
    //validate password
    req.checkBody('password', 'Password cannot be empty').notEmpty();
    //collect all errors if any exist
    var errors = req.validationErrors();

    //checking if error exist
    if(errors){
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
        });

        //returning the error to view with flash
        return done(null, false, req.flash('error', messages));
    }

    User.findOne({'email': email}, function(err, user){
        if(err){
            return done(err);
        }
        if (!user){
            return done(null, false, {message: 'User does not exist'});
        }
        if(!user.validPassword(password)){
            return done(null, false, {message: 'Password wrong'});
        }
        return done(null, user);
    });
}));