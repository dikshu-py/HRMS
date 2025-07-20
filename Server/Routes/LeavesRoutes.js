const express = require('express');
const router = express.Router();
const LeaveController = require('../Controllers/LeavesController');
const path  = "leaves"


// List all attendances
router.get(`/${path}`, LeaveController.getAllLeaves);

// Add a new attendance
router.post(`/${path}/add`, LeaveController.addLeave);

// Delete attendance by ID
router.delete(`/${path}/:id`, LeaveController.removeLeaves);

// Get attendance by ID
router.get(`/${path}/:id`, LeaveController.getLeavebyID);

// Update attendance by ID
router.put(`/${path}/:id`, LeaveController.updateLeavedata);

module.exports = router