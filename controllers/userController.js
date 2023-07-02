const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const createToken = (_id) => {
  // return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
  return jwt.sign({ _id }, process.env.SECRET)
}

// login a user
const loginUser = async (req, res) => {
  const { email, pw } = req.body

  try {
    const user = await User.login(email, pw)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// signup a user
const signupUser = async (req, res) => {
  const data = req.body

  try {
    const user = await User.signup(data)

    // create a token
    // const token = createToken(user._id)

    res.status(200).json({ ...data })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// getUser
const getUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'User tidak ditemukan' })
  }

  const user = await User.findById(id)

  if (!user) {
    return res.status(404).json({ error: 'User tidak ditemukan' })
  }

  res.status(200).json(user)
}

//   getUsers
const getUsers = async (req, res) => {
  // const user_id = req.user._id

  // const users = await User.find({ user_id })
  const users = await User.find()

  res.status(200).json(users)
}

//   deleteUser,
const deleteUser = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Section tidak ditemukan' })
  }

  const user = await User.findOneAndDelete({ _id: id })

  if (!user) {
    return res.status(400).json({ error: 'User tidak ditemukan' })
  }

  res.status(200).json(user)
}

//   updateUser
const updateUser = async (req, res) => {
  const { id } = req.params
  const { email, pw } = req.body.email

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'User tidak ditemukan' })
  }

  // email & password diisi atau belum, kuat atau tidak
  if (email && !validator.isEmail(email)) {
    throw Error('Email tidak valid')
  }
  if (pw && !validator.isStrongPassword(pw, { minLength: 8, minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0 })) {
    throw Error('Password tidak cukup kuat, gunakan minimal 8 karakter')
  }

  // Cek email sudah digunakan atau belum
  let exists
  if (email) {
    exists = await this.findOne({ email })
  }

  if (exists) {
    throw Error('Email sudah digunakan')
  }

  let salt
  let hash
  if (pw) {
    salt = await bcrypt.genSalt(10)
    hash = await bcrypt.hash(pw, salt)
  }

  let data = { ...req.body }
  if (pw) {
    data = { ...req.body, pw: hash }
  }

  const user = await User.findOneAndUpdate({ _id: id }, {
    ...data
  })

  if (!user) {
    return res.status(400).json({ error: 'User tidak ditemukan' })
  }

  res.status(200).json(user)
}

module.exports = { signupUser, loginUser, getUser, getUsers, deleteUser, updateUser }