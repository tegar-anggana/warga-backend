const Agenda = require('../models/agendaModel')
const mongoose = require('mongoose')

// get all workouts
const getAgendas = async (req, res) => {
  const user_id = req.user._id

  const agendas = await Agenda.find({user_id}).sort({createdAt: -1})

  res.status(200).json(agenda)
}

// get a single workout
const getAgenda = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const agenda = await Agenda.findById(id)

  if (!agenda) {
    return res.status(404).json({error: 'No such workout'})
  }
  
  res.status(200).json(agenda)
}


// create new workout
const createAgenda = async (req, res) => {
  const dataAgenda = req.body

  // add doc to db
  try {
    const user_id = req.user._id
    const agenda = await Agenda.create({...dataAgenda})
    res.status(200).json(agenda)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a workout
const deleteAgenda = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const agenda = await Agenda.findOneAndDelete({_id: id})

  if (!agenda) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(agenda)
}

// update a workout
const updateAgenda = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const agenda = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!agenda) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(agenda)
}


module.exports = {
  getAgendas,
  getAgenda,
  createAgenda,
  deleteAgenda,
  updateAgenda
}