const config = require('config');

const mongoose = require('mongoose');
const db = config.get('DB');
console.log('DB',db)
async function connect(params) {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log('DB connected')
    } catch (error) {
        console.error(error)
    }
}

module.exports = {connect};