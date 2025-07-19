const express = require('express');
const router = express.Router();
const empController = require('../Controllers/employeeController');


router.get("/emplyee",empController.getAllEmployees)
router.post("/emplyee/add",empController.addEmployee)
router.delete("/employee/:id",empController.removeEmployee)
router.get("/employee/:id",empController.getEmployeeByID)
router.put("/employee/:id",empController.UpdateEmployeedata)

module.exports = router