const passport = require('passport')
const user = require('../models/userSchema')


const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(async(username,password,done)=>{
    try {
        
        let User = await user.findOne({username});

        if (User) {
           if(User.password == password){
                return done(null, User);
           } 
           else{
            return done(null, false);
           }
        }else{
            return done(null,false);
        }

    } catch (error) {
        return done(error,false);
    }
}));

passport.serializeUser((User,done)=>{
    done(null,User.id);
})

passport.deserializeUser(async(id,done)=>{
    let User = await user.findById(id);
    done(null,User);
});


passport.userPassportAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/user/signin');
    }
    next();
}

passport.setUserData  = (req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;