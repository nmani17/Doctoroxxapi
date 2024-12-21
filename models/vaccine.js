const mongoose = require('mongoose');


const vaccineSchema = new mongoose.Schema({
    id: { type: String, required: false },
    age: { type: String, required: false },
    vaccines: { type: Array, required: false }


});

exports.vaccineCollection = mongoose.model('m_vaccine', vaccineSchema);
