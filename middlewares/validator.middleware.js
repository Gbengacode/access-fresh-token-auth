import validator from 'express-validator'
const { body, validationResult } = validator

export const regValidationRules = () => {
    return [
        body('firstName').not().isEmpty().trim().escape(),
        body('lastName').not().isEmpty().trim().escape(),
        body('email').not().isEmpty().trim().escape().isEmail(),
        body('password').not().isEmpty()
    ]
}

export const loginValidationRules = () => {
    try {
        return [
            body('email').not().isEmpty().trim().escape(),
            body('password').not().isEmpty().trim().escape()
        ]
    } catch (error) {
     console.log(error)   
    }
   
}

export const productValidationRules = () => {
    return [
        body('name').not().isEmpty().trim().escape(),
        body('price').not().isEmpty().trim().escape(),
        body('description').not().isEmpty().trim().escape()
       
    ]
}
export const validate = (req, res, next) => {
   try {
    const errors = validationResult(req)
    if(errors.isEmpty()) { return next()
    } 
 
    const extractedErrors = []
    errors.array().map(error => extractedErrors.push({[error.param]: error.msg}))
    return res.status(422).json({
    error: extractedErrors
    
})
       
   } catch (error) {
      console.log(error) 
   }
   

}