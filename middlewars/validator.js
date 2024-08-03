const { body, validationResult } = require('express-validator');

const userValidatorRules = () => {
    return [
        body('name').notEmpty().withMessage('اسم المستخدم مطلوب'),
        body('email').notEmpty().withMessage('البريد الإلكتروني مطلوب'),
        // body('email').isEmail().withMessage('يجب عليك إدخال صيغة بريد إلكتروني صحيح'),
        body('password').notEmpty().withMessage('كلمة المرور مطلوبة'),
        body('password').isLength({ min: 5 }).withMessage('كلمة المرور يجب أن تكون على الأقل خمسة محارف')
    ];
};
const userUpdateValidatorRules = () => {
    return [
        body('name').notEmpty().withMessage('اسم المستخدم مطلوب'),
        body('password').notEmpty().withMessage('كلمة المرور مطلوبة'),
        body('password').isLength({ min: 5 }).withMessage('كلمة المرور يجب أن تكون على الأقل خمسة محارف')
    ];
};

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map(err => 
        extractedErrors.push({ [err.param]: err.msg })
    );
    return res.status(400).json({ errors: extractedErrors });
};

module.exports = {
    userValidatorRules,
    userUpdateValidatorRules,
    validate
};
