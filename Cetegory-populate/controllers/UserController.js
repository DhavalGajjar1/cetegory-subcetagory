const user = require('../models/userSchema');
const nodemailer = require('nodemailer')

module.exports.signUpPage = (req, res) => {
    res.render('./pages/signup')
}

module.exports.signUp = async (req, res) => {
    try {
        let User = await user.create(req.body);
        console.log(User);
        req.flash('success','User is created.');
        return res.redirect('/');
    } catch (error) {
        console.log(error);
        req.flash('failure','Something went wrong.');
        return res.redirect(req.get('Referrer') || '/');
    }
}

module.exports.signinPage = (req, res) => {
    res.render('./pages/signIn')
}


module.exports.logout = (req, res) => {
    req.logout(() => {
        req.flash('success','Sign out successfully.');
        return res.redirect('/user/signin');
    });
}

module.exports.otpVerificationPage = (req, res) => {
    res.render('./pages/otp-Verification')
}

module.exports.forgetPasswordFormPage = (req, res) => {
    return res.render('./pages/forgetPasswordForm')
}

module.exports.forgetPasswordForm = async (req, res) => {
    try {

        let otp = Math.floor(100000 + Math.random() * 900000);
        console.log(req.body);
        let { email } = req.body;
        let User = await user.findOne({ email: email })
        console.log(User);
        // return res.send(User);
        if (User) {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for port 465, false for other ports
                auth: {
                    user: "manavprajapati7147@gmail.com",
                    pass: "jeoc qnte ybst gtdi",
                },
            });

            const info = await transporter.sendMail({
                from: '<manavprajapati7147@gmail.com>',
                to: `${User.email}`,
                subject: "OTP Verification Code",
                html: `<p>
                        Dear ${User.username},<br>

Thank you for connecting with Matrix Admin Panel .<br> <br>To Reset your account, please use the following One-Time Password (OTP):
<br>
<b>${otp}</b>
<br>
<br>
If you didn’t request this verification, please ignore this email or contact our support team at manavprajapati7147@gmail.com.
<br>
Thank you,<br>
The Matrix Admin Panel Team
                    </p>`
            });

            console.log("Message sent: %s", info.messageId);

            if (info.messageId) {
                res.cookie('email', email)
                res.cookie('otp', otp);
            }
            req.flash('success','OTP sent successfully.')
            return res.redirect('/user/otp-Verification')
        }
    } catch (error) {
        console.log(error)
        return res.send(error.massage);

    }
}

module.exports.otpVerification = (req, res) => {
    let otp = req.body.otpCode1 + req.body.otpCode2 + req.body.otpCode3 + req.body.otpCode4 + req.body.otpCode5 + req.body.otpCode6;
    if (otp == req.cookies.otp) {
        res.clearCookie('otp')
        return res.redirect('/user/reset-password')
        // return res.send(otp);
    } else {
        req.flash('failure','Entered Wrong OTP')
        console.log('OTP not match');
        return res.redirect(req.get('Referrer') || '/')
    }
}

module.exports.resetPasswordPage = (req, res) => {
    return res.render('./pages/resetPassword')
}

module.exports.resetPassword = async (req, res) => {
    try {
        let email = req.cookies.email;
        let { newPassword, confirmPassword } = req.body;
        let User = await user.findOne({ email });
        // console.log(User);
        // return res.send(User)
        if (User.password != newPassword) {
            if (newPassword == confirmPassword) {
                User.password = newPassword;
                await User.save();
                res.clearCookie('email');
                req.flash('success','Password changed successfully');
                return res.redirect('/user/signin');
            } else {
                req.flash('failure','New Passwoed and Confirm Password not match');
                console.log('New Password and Confirm Password not match');
            }
        } else {
            req.flash('failure','Current Password and New Password are same');
            console.log("Current password and New Password is same");
        }

        return res.redirect(req.get('Referrer') || '/');
        
    } catch (error) {
        console.log(error);
        return res.redirect(req.get('Referrer') || '/');
    }
}