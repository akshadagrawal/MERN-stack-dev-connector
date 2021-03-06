const validator = require('validator');
const isEmpty = require('./isEmpty');


module.exports= validateExperienceInput= data =>{
    let errors={};

    data.title= !isEmpty(data.title) ? data.title : '';
    data.company= !isEmpty(data.company) ? data.company : '';
    data.from= !isEmpty(data.from) ? data.from : '';

    if(validator.isEmpty(data.title)){
        errors.title= 'Job title is required'
    }

    if(validator.isEmpty(data.company)){
        errors.company= 'Copmpany is required'
    }

    if(validator.isEmpty(data.from)){
        errors.from= 'From date  is required'
    }
    

    return {
        errors,
        isValid: isEmpty(errors)
    }
}