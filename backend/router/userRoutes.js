const { Router } = require('express');


const authController = require('../controllers/authControllers');
const userController = require('../controllers/userController');

const router = Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/photo', userController.sendPhoto);



router.post('/forgotPassword', authController.forgotPassword);

// router.get('/resetPassword/:token', (req, res, next) => {
//   res.render('resetPassword')
// })


router.patch('/resetPassword/:token', authController.resetPassword);


// Protect all routes after this middleware
router.use(authController.protect);
      
router.get('/loginRefresh', authController.LoginRefresh);

//To Update password send (passwordCurrent, password, passwordConfirm)
router.patch('/updatePassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);


module.exports = router;

