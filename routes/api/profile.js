const express= require('express');
const router= express.Router();


router.get('/',(req,res)=>{
    res.send("Profiles")
})

module.exports= router;