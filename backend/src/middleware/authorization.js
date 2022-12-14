// check admin and user authorization

const { failed } = require('../helper/response')
module.exports = {
    isAdmin: (req, res, next) => {
        if (req.APP_DATA.tokenDecode.level === 0 ) {
            next();
        }else{
            failed(res, null, 'failed',`This page is exclusively for admins`)
        }
    },
    isCustomer: (req, res, next) => {
        if (req.APP_DATA.tokenDecode.level === 1 ) {
            next();
        }else{
            failed(res, null, 'failed',`This page is exclusively for users`)
        }
    },
}