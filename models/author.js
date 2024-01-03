const mongoose = require('mongoose')
const Book = require('./book')
const authorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})

authorSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    try {
        const book = await Book.findOne({ author: this._id })
        
        if (book) {
            next(new Error('This Author still has books'))
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
});


module.exports = mongoose.model('Author', authorSchema)