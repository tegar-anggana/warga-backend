const express = require('express')
const requireAuth = require('../middleware/requireAuth')

// controller functions
const {
  loginUser,
  signupUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser
} = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// butuh auth untuk route route berikutnya
router.use(requireAuth)

// GET satu user
router.get('/:id', getUser)

// GET all user
router.get('/', getUsers)

// HAPUS satu user
router.delete('/:id', deleteUser)

// UPDATE satu user
router.patch('/:id', updateUser)

module.exports = router