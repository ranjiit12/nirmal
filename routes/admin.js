const express = require("express"),
      router  = express.Router();
const passport = require("passport");
const User   = require("../models/user");
const registerUser   = require("../helps/register");       

router.post("/add/student",passport.authenticate("jwt", {session:false}) , ( req, res) => {
      if(req.user.isAdmin){
            req.body.isAdmin = false;
            registerUser(req, res);
        } else {
            res.status(401).json({message:"You are not admin. Can't add people"});
        }
        
});      

router.delete("/remove/student/:id",passport.authenticate("jwt", {session:false}) , ( req, res) => {
      if(req.user.isAdmin){

            User.findByIdAndRemove(req.params.id).
            then( () => {
                  return res.json({success:true});
            }).catch(err =>  res.json(err));

        } else {
            res.status(401).json({message:"You are not admin. Can't add people"});
        }
        
});      


router.get("/students",passport.authenticate("jwt", {session:false}) , ( req, res) => {
      if(req.user.isAdmin){

         User.find({typeOfUser:"student", isAdmin:false}).
         then( students => res.json({students})).
         catch(err => res.json(err));

        } else {
            res.status(401).json({message:"You are not admin. Can't add people"});
        }
        
});      

router.get("/student/:id",passport.authenticate("jwt", {session:false}) , ( req, res) => {
      if(req.user.isAdmin){

         User.findById(req.params.id).
         then( student => res.json({student})).
         catch(err => res.json(err));

        } else {
            res.status(401).json({message:"You are not admin. Can't add people"});
        }
        
});      



router.put("/edit/student/:id",passport.authenticate("jwt", {session:false}) , ( req, res) => {
      if(req.user.isAdmin){

            User.findByIdAndUpdate(req.params.id, req.body).
            then( () => {
                  return res.json({success:true});
            }).catch(err =>  res.json(err));

        } else {
            res.status(401).json({message:"You are not admin. Can't add people"});
        }
        
});      


module.exports = router;