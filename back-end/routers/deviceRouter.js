const Router = require("express");

const deviceRouter = Router();

const DeviceDB = require("../controllers/deviceDB.js");
const { Auth } = require("../middlewares/auth.js");

deviceRouter.route('/issue').get(Auth, DeviceDB.issue);
deviceRouter.route('/checkConnect').get(Auth, DeviceDB.checkConnect);
deviceRouter.route('/disconnect').get(Auth, DeviceDB.disconnect);

module.exports = deviceRouter;