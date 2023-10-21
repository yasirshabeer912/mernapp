const mongoose = require('mongoose')
require('dotenv').config();
const connectdb = async () => {
    try {
        const connect = mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Database Connect');
    } catch (error) {
        console.log("Error",error);
    }
}

module.exports = connectdb