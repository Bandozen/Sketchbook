const Router = require("express");

const deviceRouter = Router();

const DeviceDB = require("../controllers/deviceDB.js");
const { Auth } = require("../middlewares/auth.js");

deviceRouter.route('/issue').get(Auth, DeviceDB.issue);
deviceRouter.route('/connect').post(DeviceDB.connect);
deviceRouter.route('/checkConnect').get(Auth, DeviceDB.checkConnect);

module.exports = deviceRouter;