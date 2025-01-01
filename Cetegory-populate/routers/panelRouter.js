const { Router } = require("express");
const panelCtrl = require('../controllers/panelControllers');
const passport = require("passport");

const panelRouter = Router();

panelRouter.get('/',passport.userPassportAuth,panelCtrl.homePage);

module.exports = panelRouter;