require('dotenv').config();

module.exports = {
    development: {
        host: process.env.TEST_DB
    },
    test: {
        host: process.env.TEST_DB
    },
    staging: {
        host: process.env.PROD_DB
    }
}