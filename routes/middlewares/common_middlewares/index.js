const checkLogin = require('./checkLogin')
const checkEmail =  require('./checkEmail')
const setLoginActive = require('./setLoginActive')
const passwordResetEmail = require('./passwordResetEmail')
const resetPassword = require('./resetPassword')
const verifyPasswordResetEmail = require('./verifyPasswordResetEmail')
const validateLogin = require('./validateLogin')
const passportAuthenticate = require('./passportAuthenticate')
const logout = require('./logout')
const editProfile = require('./editProfile')
const changeProfilePhotoAwsS3 = require('./changeProfilePhotoAwsS3')
const oauthSuccess = require('./oauthSuccess')
const registerUser = require('./registerUser')
const verify = require('./verify')
const validateUserRegistration = require('./validateUserRegistration')

module.exports = {
    changeProfilePhotoAwsS3,
    verify,
    validateUserRegistration,
    registerUser,
    oauthSuccess,
    logout,
    editProfile,
    passportAuthenticate,
    validateLogin,
    resetPassword,
    verifyPasswordResetEmail,
    passwordResetEmail,
    setLoginActive,
    checkLogin,
    checkEmail,
}