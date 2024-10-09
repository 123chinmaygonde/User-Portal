const express  = require("express")
const {registerUser,loginUser,uploadAssignment}=require('../controllers/UserController')
const router = express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/upload',uploadAssignment)

module.exports=router