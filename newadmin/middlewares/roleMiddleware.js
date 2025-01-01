exports.isAdmin = (req, res, next) => {
    if (req.session.user.role === 'admin') {
      return next();
    }
    return res.status(403).send('Access Denied: Admins only');
  };
  
  exports.isUser = (req, res, next) => {
    if (req.session.user.role === 'user') {
      return next();
    }
    return res.status(403).send('Access Denied: Users only');
  };
  