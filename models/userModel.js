const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  // Data Pribadi
  email: {
    type: String,
    required: true,
    unique: true
  },
  pw: {
    type: String,
    required: true
  },
  namaLengkap: {
    type: String
  },
  namaPanggilan: {
    type: String
  },
  JK: {
    type: String
  },
  tempatLahir: {
    type: String
  },
  tanggalLahir: {
    type: Date
  },
  isIndo: {
    type: Boolean
  },
  kewarganegaraan: {
    type: String
  },
  statusNikah: {
    type: String
  },
  namaPasangan: {
    type: String
  },
  pendidikanTerakhir: {
    type: String
  },
  // Data Alamat
  statusTinggal: {
    type: String
  },
  prov: {
    type: String
  },
  kabKota: {
    type: String
  },
  kecamatan: {
    type: String
  },
  kelDes: {
    type: String
  },
  rw: {
    type: String
  },
  rt: {
    type: String
  },
  jalan: {
    type: String
  },
  noRumah: {
    type: String
  }
}, { timestamps: true })

// static signup method
userSchema.statics.signup = async function (data) {

  const email = data.email
  const pw = data.pw

  // validation
  if (!email || !pw) {
    throw Error('Silakan isi semua field')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email tidak valid')
  }
  if (!validator.isStrongPassword(pw, { minLength: 8, minLowercase: 0, minUppercase: 0, minNumbers: 0, minSymbols: 0 })) {
    throw Error('Password tidak cukup kuat, gunakan minimal 8 karakter')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email sudah digunakan')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(pw, salt)

  const user = await this.create({ ...data, pw: hash })

  return user
}

// static login method
userSchema.statics.login = async function (email, pw) {

  if (!email || !pw) {
    throw Error('Silakan isi semua field')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Email salah')
  }

  const match = await bcrypt.compare(pw, user.pw)
  if (!match) {
    throw Error('Password salah')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)