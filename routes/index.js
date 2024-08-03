const express = require('express');
const userController = require('../controller/userController')
const router = express.Router();
const { validate, userValidatorRules, userUpdateValidatorRules } = require('../middlewars/validator')
const  isLoggedIn  = require('../middlewars/authentication')
const upload = require('../middlewars/upload')

router.get('/', (req, res) => {
    res.json({
        message: 'Hello, World!',
    })
})

router.post('/account/register', userValidatorRules(), validate, userController.register)

router.post('/account/login', userController.login)

router.get('/account/profile', isLoggedIn, userController.getProfile)

router.put('/account/profile/upload-photo', 
isLoggedIn, upload.single('avatar'), userController.uploadUserPhoto);

router.put('/account/profile/update', isLoggedIn, userUpdateValidatorRules(), validate,  userController.updateProfile)

module.exports = router