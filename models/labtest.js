const mongoose = require("mongoose");

const labtestSchema = new mongoose.Schema({

    labtests: { type: Array, required: false }


});

exports.labtestCollection = mongoose.model('m_lab', labtestSchema);