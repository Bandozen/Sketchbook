const Router = require("express");

const deviceRouter = Router();

const DeviceDB = require("../controllers/deviceDB.js");
const { Auth } = require("../middlewares/auth.js");

deviceRouter.route('/issue').get(Auth, DeviceDB.issue);
deviceRouter.route('/checkConnect').get(Auth, DeviceDB.checkConnect);
deviceRouter.route('/disconnect').get(Auth, DeviceDB.disconnect);
deviceRouter.route('/start').get(Auth, DeviceDB.start);
deviceRouter.route('/stop').get(Auth, DeviceDB.stop);
deviceRouter.route('/ready').get(Auth, DeviceDB.ready);
deviceRouter.route('/record').get(Auth, DeviceDB.record);
deviceRouter.route('/mission').post(Auth, DeviceDB.mission);
deviceRouter.route('/capture').post(Auth, DeviceDB.capture);
deviceRouter.route('/mail').get(Auth, DeviceDB.mail);

module.exports = deviceRouter;