const express = require('express');
const userController = require('../controller/userController');
const postController = require('../controller/postController');
const commentController = require('../controller/commentController')
const likeController = require('../controller/likeController')

const router = express.Router();
const { validate, userValidatorRules, userUpdateValidatorRules, postValidationRules } = require('../middlewars/validator')
const isLoggedIn = require('../middlewars/authentication')
const upload = require('../middlewars/upload')

router.get('/', (req, res) => {
    res.json({
        message: 'Hello, World!',
    })
})

// User routes
router.post('/account/register', userValidatorRules(), validate, userController.register)
router.post('/account/login', userController.login)
router.get('/account/profile', isLoggedIn, userController.getProfile)
router.put('/account/profile/upload-photo', isLoggedIn, upload.single('avatar'), userController.uploadUserPhoto);
router.put('/account/profile/update', isLoggedIn, userUpdateValidatorRules(), validate, userController.updateProfile)


// Post routes
router.post('/posts/create', upload.array('postImg', 5), isLoggedIn, postValidationRules(), validate, postController.newPost);
router.get('/posts', isLoggedIn, postController.getAllPosts);
router.get('/posts/:postId', isLoggedIn, postController.getPost);
router.get('/my-posts', isLoggedIn, postController.getMyAllPosts);
router.get('/my-posts/:postId', isLoggedIn, postController.getMyPost);
router.put('/my-posts/:postId/update', postValidationRules(), validate, isLoggedIn, postController.updateMyPost);
router.delete('/my-posts/delete', isLoggedIn, postController.deleteMyPost);


// Comment Router
router.post('/posts/:postId/create-comment', isLoggedIn, commentController.createComment);
router.get('/posts/:postId/get-comments', isLoggedIn, commentController.getComment);


// Like Router
router.put('/posts/:postId/like', isLoggedIn, likeController.like);
router.get('/posts/:postId/like-count', isLoggedIn, likeController.likeCount);



module.exports = router