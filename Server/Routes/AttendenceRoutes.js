const express = require('express');
const router = express.Router();
const empController = require('../Controllers/AttendenceController');


router.get("/attendence",empController.getAllAttendence)
router.post("/attendence/add",empController.addAttendence)
router.delete("/attendence/:id",empController.removeAttendence)
router.get("/attendence/:id",empController.getAttendencebyID)
router.put("/attendence/:id",empController.updateAttendencedata)

module.exports = router