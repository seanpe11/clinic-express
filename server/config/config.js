require('dotenv').config();

module.exports = {
    development: {
        host: "mongodb://localhost:27017/clinic_dms"
    },
    test: {
        host: process.env.TEST_DB
    },
    staging: {
        host: process.env.PROD_DB
    }
}