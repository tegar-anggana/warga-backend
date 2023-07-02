const Layanan = require('../models/layananModel')
const mongoose = require('mongoose')

// get all workouts
const getLayanans = async (req, res) => {
  const user_id = req.user._id

  const layanan = await Layanan.find({ user_id }).sort({ createdAt: -1 })

  res.status(200).json(layanan)
}

// get a single workout
const getLayanan = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  const layanan = await Layanan.findById(id)

  if (!layanan) {
    return res.status(404).json({ error: 'No such workout' })
  }

  res.status(200).json(layanan)
}


// create new workout
const createLayanan = async (req, res) => {
  const { title, load, reps } = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!load) {
    emptyFields.push('load')
  }
  if (!reps) {
    emptyFields.push('reps')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const layanan = await Layanan.create({ title, load, reps, user_id })
    res.status(200).json(layanan)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a workout
const deleteLayanan = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  const layanan = await Layanan.findOneAndDelete({ _id: id })

  if (!layanan) {
    return res.status(400).json({ error: 'No such workout' })
  }

  res.status(200).json(layanan)
}

// update a workout
const updateLayanan = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such workout' })
  }

  const layanan = await Layanan.findOneAndUpdate({ _id: id }, {
    ...req.body
  })

  if (!layanan) {
    return res.status(400).json({ error: 'No such workout' })
  }

  res.status(200).json(layanan)
}


module.exports = {
  getLayanans,
  getLayanan,
  createLayanan,
  deleteLayanan,
  updateLayanan
}