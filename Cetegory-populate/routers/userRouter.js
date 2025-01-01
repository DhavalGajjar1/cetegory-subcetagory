const { Router } = require("express");

const userCtrl = require("../controllers/UserController"); 
const passport = require("passport");
const flashMessage = require("../middlewares/flashMassageMiddleware");

const userRouter = Router();

userRouter.get('/signup',userCtrl.signUpPage);
userRouter.get('/signin',userCtrl.signinPage);
userRouter.post('/signin',passport.authenticate('local',{ failureRedirect: '/user/signin', successRedirect: '/' }));
userRouter.post('/create',userCtrl.signUp);
userRouter.get('/logout',userCtrl.logout);

userRouter.get('/forgetPasswordForm',userCtrl.forgetPasswordFormPage)
userRouter.post('/forgetPasswordForm',userCtrl.forgetPasswordForm)

userRouter.get('/otp-Verification',userCtrl.otpVerificationPage)
userRouter.post('/otp-Verification',userCtrl.otpVerification)

userRouter.get('/reset-password',userCtrl.resetPasswordPage)
userRouter.post('/reset-password',userCtrl.resetPassword)


module.exports = userRouter;