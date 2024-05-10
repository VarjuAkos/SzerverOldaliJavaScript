const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Image = db.model('Image', {
    file_path: String,
    prompt: String,
    _owner:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = Image;