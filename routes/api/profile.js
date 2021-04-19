const express= require('express');
const router= express.Router();
const Profile= require('../../models/Profile');
const User= require('../../models/User');

const passport = require('passport');

//load validations
const validateProfileInput= require('../../validations/profile')
const validateExperienceInput= require('../../validations/experience')
const validateEducationInput= require('../../validations/education');
const { remove } = require('../../models/Profile');

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
        else {
            res.json(profile);
        }
    })
    .catch(err=> res.status(404).json(err));
})


//@route    GET api/profile/handle/:handle
//@desc     Get profile by handle
//Access    Public

router.get('/handle/:handle', (req,res)=>{

    const errors = {};

    Profile.findOne({handle: req.params.handle})
    .populate('user', ['name', 'avatar'])
    .then(profile=>{
            if(!profile){
                errors.noprofile= 'Threr is no profile for this user';
                res.status(404).json(errors);
            }
            else {
                res.json(profile);
            }
     })
    .catch(err=> console.log(err));
});


//@route    GET api/profile/user/:user_id
//@desc     Get profile by user id
//Access    Public

router.get('/user/:user_id', (req,res)=>{

    const errors = {};

    Profile.findOne({user: req.params.user_id})
    .populate('user', ['name', 'avatar'])
    .then(profile=>{
            if(!profile){
                errors.noprofile= 'Threr is no profile for this user';
                res.status(404).json(errors);
            }
            else {
                res.json(profile);
            }
     })
    .catch(err=> {
        errors.noprofile= 'Thre is no profile for this user';
        res.status(404).json(errors);

    });
})

//@route    GET api/profile/all
//@desc     Get all profiles
//Access    Public

router.get('/all', (req,res)=>{
    const errors={}

    Profile.find()
     .populate('user', ['name', 'avatar'])
        .then(profile =>{
        if(!profile){
            errors.noprofile= 'No profiles';
             return res.status(400).json(errors);
        }
        else {
            res.json(profile);
        }
    })
    .catch(err=> {
        errors.noprofile= 'Thre is no profile for this user';
        res.status(404).json(errors);

    });
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
    profileFields.user= req.user.id;
    

    if(req.body.handle) profileFields.handle= req.body.handle;
    if(req.body.company) profileFields.company= req.body.company;
    if(req.body.website) profileFields.website= req.body.website;
    if(req.body.location) profileFields.location= req.body.location;
    if(req.body.bio) profileFields.bio= req.body.bio;
    if(req.body.status) profileFields.status= req.body.status;
    if(req.body.githubusername) profileFields.githubusername= req.body.githubusername;
    
    //skills split into array
    if(typeof req.body.skills !== 'undefined'){
        profileFields.skills= req.body.skills.split(','); //comma seperated values
    }

    //Social
    profileFields.social ={};
    if(req.body.youtube) profileFields.social.youtube= req.body.youtube;
    if(req.body.twitter) profileFields.social.twitter= req.body.twitter;
    if(req.body.linkedin) profileFields.social.linkedin= req.body.linkedin;
     profileFields.social.instagram= req.body.instagram;
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


//@route    POST api/expereince
//@desc     Add experience to profile
//Access    Private

router.post('/experience', passport.authenticate('jwt', {session: false}), (req,res)=>{

    const {errors, isValid} = validateExperienceInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    Profile.findOne({user: req.user.id})
        .then(profile=>{
            const newExp= {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }

            //Add to experience array
           profile.experience.unshift(newExp);

            profile.save()
                .then(profile=> res.json(profile));
        })
        .catch(err=> console.log(err));
});

//@route    POST api/education
//@desc     Add education to profile
//Access    Private

router.post('/education', passport.authenticate('jwt', {session: false}), (req,res)=>{

    const {errors, isValid} = validateEducationInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    Profile.findOne({user: req.user.id})
        .then(profile=>{
            const newEdu= {
                school: req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            }

            //Add to education array
           profile.education.unshift(newEdu);

            profile.save()
                .then(profile=> res.json(profile));
        })
        .catch(err=> console.log(err));
});


//@route    DELETE api/profile/experience/:exp_id
//@desc     Delete eperience from profile
//Access    Private

router.delete('/experience/:exp_id', passport.authenticate('jwt', {session: false}), (req,res)=>{


    Profile.findOne({user: req.user.id})
        .then(profile=>{
            
            //Get remove Index
            const removeIndex= profile.experience
            .map(item=>item.id )
            .indexOf(req.params.exp_id);

            //splice out of array
            profile.experience.splice(remove, 1);

            //save
            profile.save()
                .then(profile=> res.json(profile))
                .catch(err=> console.log(err));
            
        })
        .catch(err=> console.log(err));
})

//@route    DELETE api/profile/eduction/:edu_id
//@desc     Delete education from profile
//Access    Private

router.delete('/education/:edu_id', passport.authenticate('jwt', {session: false}), (req,res)=>{


    Profile.findOne({user: req.user.id})
        .then(profile=>{
            
            //Get remove Index
            const removeIndex= profile.education
            .map(item=>item.id )
            .indexOf(req.params.edu_id);

            //splice out of array
            profile.education.splice(remove, 1);

            //save
            profile.save()
                .then(profile=> res.json(profile))
                .catch(err=> console.log(err));
            
        })
        .catch(err=> console.log(err));
});

//@route    DELETE api/profile/
//@desc     Delete user and profile
//Access    Private


router.delete('/', passport.authenticate('jwt', {session: false}), (req,res)=>{

    Profile.findOneAndRemove({user: req.user.id})
        .then(()=>{
            User.findOneAndRemove({_id: req.user.id})
                .then(()=> res.json({success: true}));

        })

});


module.exports= router;