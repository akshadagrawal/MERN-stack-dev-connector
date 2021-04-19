const validator = require('validator');
const isEmpty = require('./isEmpty');


module.exports= validateEducationInput= data =>{
    let errors={};

    data.school= !isEmpty(data.school) ? data.school : '';
    data.degree= !isEmpty(data.degree) ? data.degree : '';
    data.from= !isEmpty(data.from) ? data.from : '';
    data.fieldofstudy= !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';

    if(validator.isEmpty(data.school)){
        errors.school= 'School is required'
    }

    if(validator.isEmpty(data.degree)){
        errors.degree= 'Degree is required'
    }

    if(validator.isEmpty(data.fieldofstudy)){
        errors.fieldofstudy= 'This field is required'
    }

    if(validator.isEmpty(data.from)){
        errors.from= 'From date  is required'
    }
    

    return {
        errors,
        isValid: isEmpty(errors)
    }
}