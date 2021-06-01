const express= require('express');
const User = require('../../models/User');
const router= express.Router();
const gravatar= require('gravatar');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const secretKey= require('../../config/keys').secretKey;
const passport = require('passport');

//Load validators input
const validateRegisterInput = require('../../validations/register');
const validateLoginInput =  require('../../validations/login');

//@route    POST api/users/register
//@desc     Register User
//Access    public

router.post('/register',(req,res)=>{

    const {errors, isValid} = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const {name,email,password} = req.body;
    
    User.findOne({ email})
        .then(user=>{
            //if user already exists
            if(user) {
                errors.email=  'Email already exists';
                return res.status(400).json(errors); 
            }
            else {
                const avatar= gravatar.url(email, {
                    s:'200', //size
                    r: 'pg', //ratings
                    d: 'mm'  //default
                });

                const newUser = new User({
                    name,
                    email,
                    avatar,
                    password
                });

                //hashing the password
                bcrypt.genSalt(10, (err,salt)=>{
                    bcrypt.hash(newUser.password, salt, (err,hash)=>{
                        if(err) throw err;
                         newUser.password= hash;
                         newUser.save()
                            .then(user=> res.json(user))
                            .catch(err=> console.log(err));
                    })
                })
            }
        })
        .catch(err=> console.log(err));
})

//@route    POST api/users/login
//@desc     Login User an return  token
//Access    public

router.post('/login', (req,res)=>{
    const {errors, isValid} = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const { email, password} = req.body;

    User.findOne({email})
        .then(user=>{
            if(!user){
                errors.email = 'User not found';
                return res.status(404).json(errors);
            }

            //check if password match or not
            bcrypt.compare(password, user.password)
                .then(isMatch=>{
                    if(!isMatch) {
                        errors.password= 'Password incorrect';
                        return res.status(400).json(errors);
                    }

                    //matched so generate token
                    const payload={
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar
                    }
                    const key = secretKey

                    //sign the token
                    jwt.sign(
                        payload,
                        key,
                        { expiresIn: 3600},
                        (err, token) =>{
                            if(err) throw err;
                            res.json({
                                success: true,
                                token: 'Bearer '+ token
                            })
                        }    
                    )
                })
        })
})

//@route    POST api/users/current
//@desc     Return current User
//Access    Private

router.get('/current', passport.authenticate('jwt', {session: false}), (req,res)=>{
    User.findById(req.user.id)
        .select('-password')
        .then(user=> res.json(user)); 
})



module.exports= router; 