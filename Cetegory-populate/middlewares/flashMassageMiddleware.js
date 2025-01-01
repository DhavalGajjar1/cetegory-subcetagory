const flashMessage = (req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.failure = req.flash('failure');
    next();
}

module.exports = flashMessage;