const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Assignment = require('../models/Assignment');

// Register a new admin
exports.registerAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({ username, password: hashedPassword });
        await admin.save();
        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error registering admin' });
    }
};

// Login admin
exports.loginAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: 'Error logging in' });
    }
};

// Get assignments for admin
exports.getAssignments = async (req, res) => {
    const adminId = req.admin.id; // Assuming middleware sets req.admin
    try {
        const assignments = await Assignment.find({ admin: adminId });
        res.json(assignments);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching assignments' });
    }
};

// Accept an assignment
exports.acceptAssignment = async (req, res) => {
    const { id } = req.params;
    try {
        await Assignment.findByIdAndUpdate(id, { status: 'Accepted' });
        res.json({ message: 'Assignment accepted' });
    } catch (error) {
        res.status(400).json({ message: 'Error accepting assignment' });
    }
};

// Reject an assignment
exports.rejectAssignment = async (req, res) => {
    const { id } = req.params;
    try {
        await Assignment.findByIdAndUpdate(id, { status: 'Rejected' });
        res.json({ message: 'Assignment rejected' });
    } catch (error) {
        res.status(400).json({ message: 'Error rejecting assignment' });
    }
};