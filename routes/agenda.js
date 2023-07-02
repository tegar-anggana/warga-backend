const express = require('express')
const {
  createAgenda,
  getAgendas,
  getAgenda,
  deleteAgenda,
  updateAgenda
} = require('../controllers/agendaController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all workouts
router.get('/', getAgendas)

//GET a single workout
router.get('/:id', getAgenda)

// POST a new workout
router.post('/', createAgenda)

// DELETE a workout
router.delete('/:id', deleteAgenda)

// UPDATE a workout
router.patch('/:id', updateAgenda)


module.exports = router