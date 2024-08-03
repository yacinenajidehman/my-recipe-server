const models = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const findeEmail = await models.User.findOne({ where: { email } })
        if (!findeEmail) {
            const user = await models.User.create({
                name,
                email,
                password
            })
            res.status(200).json({
                message: 'تم إنشاء حسابك بنجاج'
            })
        } else {
            res.status(400).json({
                message: 'البريد الإلكتروني موجود مسبقا'
            })
        }
    } catch (e) {
        res.status(500).json(e)
    }
}
exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await models.User.findOne({ where: { email } })
        if (!user) {
            res.status(401).json({
                message: 'كلمة المرور أو البريد الإلكتروني غير صحيح'
            })
        } else {
            const pass = await bcrypt.compare(password, user.password)
            if (pass) {
                const token = jwt.sign({
                    id: user.id,
                    email: user.email
                }, process.env.JWT_SECRET)
                res.status(200).json({
                    accessToken: token,
                })
            } else {
                res.status(401).json({
                    message: 'كلمة المرور أو البريد الإلكتروني غير صحيح'
                })
            }
        }
    } catch (e) {
        res.status(500).json(e)
    }
}

exports.getProfile = async (req, res) => {
    try {
        const user = await models.User.findOne({
            where: { id: req.currentUser.id },
            attributes: { exclude: ['id', 'password'] }
        })
        res.status(200).json(user)
    } catch (e) {
        res.status(500).json(e)
    }
}

exports.uploadUserPhoto = async (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    try {
        const uploadPhoto = await models.User.update(
            { img_uri: url + '/public/images/' + req.file.filename },
            { where: { id: req.currentUser.id } }
        )
        res.status(200).json({
            message: 'تم رفع الصورة بنجاح',
        })
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.updateProfile = async (req, res) => {
    const { name, password } = req.body;
    try {
        const update = await models.User.update({
            name,
            password
        }, {
            where: {
                id: req.currentUser.id,
                
            },
            individualHooks: true
        }
        );
        res.status(200).json({
            message: 'تم تحديث الملف الشخصي بنجاح',
        })
    } catch (error) {
        res.status(500).json(error)
    }
}