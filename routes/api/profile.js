const express= require('express');
const router= express.Router();
const config= require('config');
const mongoose= require('mongoose');
const Profile= require('../../models/Profile');
const passport = require('passport');

//load validations
const validateProfileInput= require('../../validations/profile')

//@route    GET api/profile
//@desc     GET current User profile
//Access    Private

router.get('/',passport.authenticate('jwt', {session: false}), (req,res)=>{
    
    const errors={};
    const {id} = req.user;
    Profile.findOne({user: id})
    .populate('user', ['name', 'avatar'])
    .then(profile=>{
        if(!profile){
            errors.noprofile = "There is no profile for this user";
            return res.status(404).json(errors);
        }
        res.json(profile);
    })
    .catch(err=> res.status(404).json(err));
})


//@route    POST api/profile
//@desc     Create or Edit  profile
//Access    Private

router.post('/',passport.authenticate('jwt', {session: false}), (req,res)=>{

    const {errors, isValid} = validateProfileInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    const {id,name} = req.user;

    //Get all fields
    const profileFields={};
    profileFields.user= req.user;
    

    if(req.body.handle) profileFields.handle= req.body.handle;
    if(req.body.company) profileFields.company= req.body.company;
    if(req.body.website) profileFields.website= req.body.website;
    if(req.body.location) profileFields.location= req.body.location;
    if(req.body.bio) profileFields.bio= req.body.bio;
    if(req.body.status) profileFields.status= req.body.status;
    if(req.body.youtube) profileFields.githubusername= req.body.githubusername;
    
    //skills split into array
    if(typeof req.body.skills !== 'undefined'){
        profileFields.skills= req.body.skills.split(','); //comma seperated values
    }

    //Social
    profileFields.social ={};
    if(req.body.youtube) profileFields.social.youtube= req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter= req.body.twitter;
    if(req.body.linkedin) profileFields.social.linkedin= req.body.linkedin;
    if(req.body.instagram) profileFields.social.instagram= req.body.instagram;
    if(req.body.facebook) profileFields.social.facebook= req.body.facebook;

    Profile.findOne({user: id})
        .then(profile=>{
            if(profile){
                //means update
                Profile.findOneAndUpdate(
                    {user: id},
                    { $set: profileFields},
                    {new: true}
                )
                .then( profile => res.json(profile))
                .catch(err=> console.log(err));
            } else{

                //check if handle exists
                Profile.findOne({handle: profileFields.handle})
                    .then(profile=>{
                        if(profile){
                            errors.handle = 'This handle already exists';
                            res.status(400).json(errors);
                        }

                        //save profile
                        new Profile(profileFields)
                            .save()
                            .then(profile=> res.json(profile))
                            .catch(err=> console.log(err));

                    })
                    .catch(err=> console.log(err));
            }
        })
        .catch(err=> console.log(err));


});

module.exports= router;