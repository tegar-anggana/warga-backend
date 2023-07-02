const express = require('express')
const {
  createLayanan,
  getLayanans,
  getLayanan,
  deleteLayanan,
  updateLayanan
} = require('../controllers/layananController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all workouts
router.get('/', getLayanans)

//GET a single workout
router.get('/:id', getLayanan)

// POST a new workout
router.post('/', createLayanan)

// DELETE a workout
router.delete('/:id', deleteLayanan)

// UPDATE a workout
router.patch('/:id', updateLayanan)


module.exports = router