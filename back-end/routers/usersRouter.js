const Router = require("express");

const usersRouter = Router();

const UsersDB = require("../controllers/usersDB.js");
const { Auth } = require("../middlewares/auth.js");

usersRouter.route('/register').post(UsersDB.register);
usersRouter.route('/idCheck').post(UsersDB.idCheck);
usersRouter.route('/login').post(UsersDB.login);
usersRouter.route('/auth').get(Auth, UsersDB.auth);
usersRouter.route('/logout').get(Auth, UsersDB.logout);
usersRouter.route('/mail').post(UsersDB.mail);
usersRouter.route('/checkVerificationCode').post(UsersDB.checkVerificationCode);
usersRouter.route('/tempPassword').post(UsersDB.tempPassword);
usersRouter.route('/changePassword').post(Auth, UsersDB.changePassword);

module.exports = usersRouter;
