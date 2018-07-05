const express                 = require("express"),
      bcrypt                  = require("bcryptjs");
const User                    = require("../models/user"),
      secretOrkey             = require("../config/keys").secretOrkey;


module.exports = (req, res) => {
    const newUser = User({
        email: req.body.email,
        password: req.body.password,
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        isAdmin: req.body.isAdmin,
        typeOfUser: req.body.typeOfUser
    });

    // hash the password 
    bcrypt.genSalt(10, (err, salt) =>{
        if(err){
            res.status(404).json({saltError: err});
        } else {
            bcrypt.hash(newUser.password, salt, (err, hash) =>{
                if(err) {
                   res.status(404).json({hashError: err});
                } else {
                    newUser.password = hash;
                    newUser.save()
                    .then(user => {
                        res.json({success:true});
                    })
                    .catch(err => {
                       res.status(404).json({success:false, err:err});
                    });
                }
            })
        }
    })
}