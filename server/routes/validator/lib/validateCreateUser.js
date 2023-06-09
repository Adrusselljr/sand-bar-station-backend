const { isAlpha, isEmail } = require('validator')

const validateCreateUser = (req, res, next) => {
    const { firstName, lastName, email } = req.body
    let errObj = {}

    if(!isAlpha(firstName)) {
        errObj.firstName = "First name cannot include numbers or special characters."
    }
    if(!isAlpha(lastName)) {
        errObj.lastName = "Last name cannot include numbers or Special characters."
    }
    if(!isEmail(email)) {
        errObj.email = "Email is not in correct format."
    }
    let checkObj = Object.keys(errObj)

    if(checkObj.length > 0) {
        return res.status(500).json({ message: "error", error: errObj })
    }
    else {
        next()
    }
}

module.exports = {
    validateCreateUser
}