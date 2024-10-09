const express = require('express');
const { registerAdmin, loginAdmin, getAssignments, acceptAssignment, rejectAssignment } = require('../controllers/AdminController');
const { verifyAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/assignments', verifyAdmin, getAssignments);
router.post('/assignments/:id/accept', verifyAdmin, acceptAssignment);
router.post('/assignments/:id/reject', verifyAdmin, rejectAssignment);

module.exports = router;