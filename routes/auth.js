const express                 = require("express"),
      bcrypt                  = require("bcryptjs"),
      passport                = require("passport"),
      jwt                     = require("jsonwebtoken"),
      mongoose                = require("mongoose"),
      router                  = express.Router();

const User                    = require("../models/user"),
      secretOrkey             = require("../config/keys").secretOrkey;

const registerUser            = require("../helps/register");      

router.post("/register", passport.authenticate("jwt", {session:false}),(req, res)  => {
        if(req.user.isAdmin){
            req.body.isAdmin = true;
            registerUser(req, res);
        } else {
            return res.status(401).json({message:"You are not admin. Can't add people"});
        }
        
    }
 );    
 
 // @url api/users/login post route
 // @for login of the user
 // @access public
 
 router.post("/login",(req, res) => {
     var errors  = {};
 
       User.findOne({email:req.body.email})
       .then( user => {
           if(user){
               bcrypt.compare(req.body.password, user.password)
               .then( isMatch => {
                   // user matched
                   if(isMatch){
                       const payload = {
                         id:user.id, 
                         isAdmin:user.isAdmin, 
                         }; // create jwt payload
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