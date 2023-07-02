const mongoose = require('mongoose')

const Schema = mongoose.Schema

const agendaSchema = new Schema({
  title: {
    type: String,
    required: true
  },
   start: {
     type: Date,
     required: true
   },
   end: {
     type: Date,
     required: true
   },
   deskripsi: {
     type: String,
     required: true
   },
   lokasi: {
     type: String,
     required: true
   },
   pembuat: {
     type: String,
     required: true
   },
}, { timestamps: true })

module.exports = mongoose.model('Agenda', agendaSchema)