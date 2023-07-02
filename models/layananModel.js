const mongoose = require('mongoose')

const Schema = mongoose.Schema

const layananSchema = new Schema({
jenis_layanan:  {
type: String,
required: true
},
   isi: {
     type: String,
     required: true
   },
   jenis_surat: {
     type: String,
   },
   akun_id: {
     type: String,
     required: true
   }
}, { timestamps: true })

module.exports = mongoose.model('Layanan', layananSchema)