const express                 = require("express"),
      bcrypt                  = require("bcryptjs"),
      passport                = require("passport"),
      jwt                     = require("jsonwebtoken"),
      mongoose                = require("mongoose"),
      router                  = express.Router();

const User                    = require("../models/user"),
      secretOrkey             = require("../config/keys").secretOrkey;

router.post("/register", (req, res)  => {
          console.log(req.body);
        const newUser = User({
            email: req.body.email,
            password: req.body.password,
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            isAdmin: req.body.isAdmin
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
 );    
 
 // @url api/users/login post route
 // @for login of the user
 // @access public
 
 router.post("/login", (req, res) => {
    
 
       User.findOne({email:req.body.email})
       .then( user => {
           if(user){
               bcrypt.compare(req.body.password, user.password)
               .then( isMatch => {
                   // user matched
                   if(isMatch){
                       const payload = {
                         id:user.id, 
                         isDonor:user.isDonor, 
                         isProfileCreated:user.isProfileCreated }; // create jwt payload
                       // sign token
                       jwt.sign(
                           payload,
                           secretOrkey,
                           {expiresIn:3600},
                           (err, token) => {
                               if(!err) {
                                   res.json({success:true, token: "Bearer "+ token, isDonor:user.isDonor})
                               }
                           }
                         )
                   } else {
                       errors.password = "Incorrect password";
                       res.status(404).json(errors);
                   }
               })
           } else {
               errors.email = "Email not found"
               res.status(404).json(errors);
           }
       })
    }
 );
 

 module.exports = router;