const mongoose = require('mongoose');
// const Schema = mongoose.schema();

const TodoSchema = new mongoose.Schema({
    title: String,
    complete: Boolean
});

module.exports = mongoose.model('Todo', TodoSchema);