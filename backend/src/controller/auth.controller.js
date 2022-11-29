const userModel = require('../model/user.model');
const { failed, success, succesWithToken } = require('../helper/response');



// declare bcrypt
const bcrypt = require('bcrypt');
const jwtToken = require('../helper/generateJWT');
// const upload = require('../middleware/upload');

module.exports = {
    register: (req, res) => {
        try {
            const { name, email, password, phone } = req.body;
            console.log(name)
            
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return failed(res, err.message, 'failed', 'fail hash password');;
                }
                const data = {
                    name,
                    email,
                    password: hash,
                    phone,
                }

                console.log(data);

                userModel.register(data)
                    .then((result) => {
                        success(res, result, 'success', 'Success register');
                    })
                    .catch((err) => {
                        failed(res, err.message, 'failed', 'fail register');
                    })
            })
        } catch (err) {
            failed(res, err.message, 'failed', 'internal server error');
        }

    },

    // login method controller
    login: (req, res) => {
        const { email, password } = req.body;
        userModel.checkEmail(email).then((result) => {
            // console.log(res.rows[0]);
            // console.log(res.rowCount);
            console.log(result.rows[0]);
            // return;
            const user = result.rows[0];
            if (result.rowCount > 0) {
                bcrypt.compare(password, result.rows[0].password).then(async (result) => {
                    if (result) {

                        const token = await jwtToken({
                            email: user.email,
                            level: user.level
                        });
                        console.log(token)
                        success(res, {
                            token,
                            data: user,
                        }, "success", "login success");
                    } else {
                        // when  password wrong
                        failed(res, null, 'failed', 'username or password is not valid');
                    }
                })
            } else {
                // when username wrong
                failed(res, null, 'failed', 'username or password is not valid');
            }
        }).catch((err) => {
            failed(res, err.message, 'failed', 'internal server error');
        })
    },

    
}